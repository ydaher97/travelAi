import { NextResponse } from "next/server";
import getOpenAiInstance from '@/lib/openai';

const openai = getOpenAiInstance();

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fixJsonString(jsonString) {
  // Attempt to fix common issues in JSON strings
  let fixedString = jsonString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
  return fixedString;
}

export async function POST(req, res) {
  try {
    const { location, date, budget, duration, restaurants, attractions } = await req.json();
    const selectedAttractions = attractions.slice(9).map(attraction => ({
      geometry: attraction.geometry.location,
      attraction_name: attraction.name,
      rating: attraction.rating || null,  
      opening_hours: attraction.opening_hours,
      user_ratings_total: attraction.user_ratings_total || null  
    }));
    
    const selected = JSON.stringify(selectedAttractions)
    console.log(selected)

    const convo = [
      {
        role: "system",
        content: `Based on my location in ${location} on ${date}, with a budget of ${budget} and a duration of ${duration} days, suggest some attractions. Here are some attractions ${selectedAttractions} I'm considering. Create a fill all the fields and make the plane based on the user input detailed plan with the following structure in JSON format:
    make the plans with date and duration in the duration ${duration} days so you make as many as the duration so you add 1 to the day of the date each time and finish the answers till it finish dont cut
    {
      "plan": {
        "put this date ${date}": {
          "attractions": [
            {
              "name": "Attraction name",
              "geometry": {
                "location": {
                  "lat": 0.0,
                  "lng": 0.0
                }
              },
              "opening_hours": {
                "open_now": true
              },
            },
            {
              "name": "Attraction 2",
              "geometry": {
                "location": {
                  "lat": 0.0,
                  "lng": 0.0
                }
              },
              "opening_hours": {
                "open_now": true
              },
            }
          ],
          "times": {
            "Attraction 1": "Morning",
            "Attraction 2": "Afternoon"
          },
          "total_cost": 0
        }
      }
    }`,
      },
      { role: "user", content: 'reply in JSON format' },
    ];
    
    console.log(duration)
    const conversation = [
      {
        role: "system",
        content:
          "You are a helpful assistant that makes a travel plan. i will provide all the infromation you need.  date, destination. duration, budget and attraction",
      },
      { role: "user", content: `Hello, I'd like to go to ${location}` },
      {
        role: "assistant",
        content: "Of course! Could you please povide me with more information?",
      },
      { role: "user", content: `Based on my location in ${location} on ${date}, a duration of ${duration} days, suggest some attractions. Here are some attractions ${selected} I'm considering. Create a travle plan based on the user input.`},
      { role: "assistant", content: `Great! so you are going to ${location} on the ${date} for ${duration}` },
      { role: "user", content: `yes make a plan for each day the first day start at the ${date} and up` },
      { role: "assistant", content: "Sounds good. so a plan for each day(date)" },
      { role: "user",
       content: `yes, make the plan in this structure based on the attraction that i provided fill all the fields not placeholders but the attraction_name i provided 
       "attractions": [
        {
          "name": "",
          "location": {
            "lat": 0.0,
            "lng": 0.0
            }
          ,
          "opening_hours": {
            "open_now": true
          },
          "time": "morning or afternoon or night"
          "date":"the date",
          
        }, 
      ]` },
      {
          role: "assistant",
          content:
            "Alright.",
        },

      // {
      //   role: "assistant",
      //   content:
      //     "Alright. Do you have any special requirements or requests for your flight?",
      // },
      // {
      //   role: "user",
      //   content:
      //     "I'd like to have a vegetarian meal and a window seat if possible.",
      // },

      { role: "user", content: "reply in JSON format.  important make sure to output only an array of attractions(key) with each attraction is an object no notes or other strings just the object" },
      {
        role: "assistant",
        content: "Perfect,i will return an array of attraction I'll get that information for you right away.",
      },
    ];
    // Maximum number of retry attempts
    const maxRetries = 3;

    // for (let attempt = 1; attempt <= maxRetries; attempt++) {
      // Step 2: Interact with ChatGPT
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: conversation,
        max_tokens: 600,
        temperature:1
      });

      // Step 3: Process ChatGPT response
      const rawSuggestions = completion.choices[0].message.content;

      console.log(`raw${rawSuggestions}`);
      //    const fixedSuggestions = await fixJsonString(rawSuggestions);
      // console.log("fixed" + fixedSuggestions)
      // Try fixing common issues in the JSON string
        // const parsedSuggestions = JSON.parse(fixedSuggestions);
        // console.log("parsed" + parsedSuggestions)


      // Try parsing the response as JSON
      // try {
      //   //const parsedSuggestions = JSON.parse(checkedSuggestions);
      //   const fixedSuggestions = await fixJsonString(rawSuggestions);
      //   console.log("fixed" + fixedSuggestions)
      //   const checkedSuggestions = await ensureJsonFormat(fixedSuggestions)
      //   console.log("checked" + checkedSuggestions)
      //   // Check if the parsed result is a valid JSON object
      //   if (typeof checkedSuggestions === 'object' && checkedSuggestions !== null) {
      //     return NextResponse.json(checkedSuggestions);
      //   } else {
      //     console.error(`Attempt ${attempt}: Invalid JSON structure from ChatGPT - ${parsedSuggestions}`);
      //   }
      // } catch (parseError) {
      //   console.error(`Attempt ${attempt}: Error parsing ChatGPT response as JSON -`);

      //   // Retry after a short duration ${parseError}
      //   await sleep(1000);
      // }
    // }

    // If all attempts fail, return an error response
    return new NextResponse(rawSuggestions, { status: 200 });
  } catch (error) {
    console.error('Error getting suggestions from ChatGPT:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



function ensureJsonFormat(inputString) {
  try {
    const parsedJson = JSON.parse(inputString);
    // If parsing is successful, return the parsed JSON
    return parsedJson;
  } catch (parseError) {
    // If parsing fails, attempt to fix common issues
    const fixedJsonString = inputString
      // Replace single quotes with double quotes
      .replace(/'/g, '"')
      // Ensure keys are enclosed in double quotes
      .replace(/(\w+)\s*:/g, '"$1":')
      // Ensure values are enclosed in double quotes
      .replace(/:\s*'([^']*)'/g, ':"$1"');
    
    try {
      // Try parsing the fixed string
      const fixedJson = JSON.parse(fixedJsonString);
      return fixedJson;
    } catch (fixError) {
      // If fixing also fails, log the errors and return null
      console.error('Error during JSON parsing:', parseError);
      console.error('Error during JSON fixing:', fixError);
      return null;
    }
  }
}



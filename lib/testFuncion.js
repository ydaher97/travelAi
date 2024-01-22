// import getOpenAiInstance from './openai'
import OpenAI from "openai";

let openaiInstance = null;

const getOpenAiInstance = () => {
console.log(process.env.OPENAI_API_KEY)
if (!openaiInstance) {
    const configuration = {
    // organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
    };
    openaiInstance = new OpenAI(configuration);
}
return openaiInstance;
};

export async function test(){
    try{

      
        const openai = getOpenAiInstance()
        console.log(openai)
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
              {
                role: "system",
                content:
                  "Give me the question, the topic, the answer and the source of questions I ask you. Provide it in JSON format",
              },
              { role: "user", content: "Who won the world series in 2020?" },
            ],
            model: "gpt-3.5-turbo-1106",
            seed: 50,
            response_format: { type: "json_object" },
          });
        // Step 3: Process ChatGPT response
        // const suggestions = completion.data.choices.map(choice => choice.text);
        const suggestions = completion.choices[0].text
    
        console.log('ChatGPT Suggestions:', suggestions);
    }catch(error){
        console.log(error)
    }
}
// pages/api/suggestions.js
// import  prismadb  from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";
// import axios from 'axios';
import { NextResponse } from "next/server";
import getOpenAiInstance from '@/lib/openai'

const openai = getOpenAiInstance()


export  async function POST(req, res) {
  try {
    

   

    // Step 2: Interact with ChatGPT
    console.log('gdfgdsfgdsfg')
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
    // await prismadb.Activity.createMany(
    //     data: manyData,
    // });
    // Return the suggestions as a response
    // return NextResponse.json(suggestions);
} catch (error) {
    console.error('Error getting suggestions from ChatGPT:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

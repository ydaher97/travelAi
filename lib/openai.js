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
export default getOpenAiInstance;
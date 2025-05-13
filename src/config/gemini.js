const apikey="AIzaSyBsG92_dwluQZPjJAIFoXsh9BrQR6RticM"
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';

// async function main(prompt) {
//   const ai = new GoogleGenAI({
//     apiKey: apikey,
//   });
//   const config = {
//     responseMimeType: 'text/plain',
//   };
//   const model = "models/gemini-2.5-pro-exp-03-25";

//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: prompt,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   for await (const chunk of response) {
//     console.log(chunk.text);
//     return chunk.text;
//   }
// }

// export default main;
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = apikey
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  })

  const result = await chatSession.sendMessage(prompt)
  const response = result.response.text()
  console.log(result.response.text())

  return response
}

export default run;

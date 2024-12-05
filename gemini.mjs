import { readFile } from 'fs/promises'; // שימוש ב-API חדש של fs
import { GoogleGenerativeAI } from "@google/generative-ai";

// גישה למפתח API שלך
const genAI = new GoogleGenerativeAI("AIzaSyDFZaBNwqJ3vv6VmYE-4T3sBjbQ-On7feM");

async function run() {
    // קרא את קובץ ה-JSON
    const victimData = JSON.parse(await readFile('./victims.json', 'utf-8'));

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `According to the next patient, assume the patient status according to only one of the four following: decisive, critical, urgent, stable. Return the status as only one word that can describe the best way from the following list: ['decisive', 'critical', 'urgent', 'stable']. The patient data: ${JSON.stringify(victimData)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
}

run();

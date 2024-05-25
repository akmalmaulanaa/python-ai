import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_GROQ;
const groq = new Groq({
    apiKey: GROQ_API,
    dangerouslyAllowBrowser: true
});

const requestToGroqAi = async content => {
    const reply = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: content
            }
        ],
        model: "llama3-8b-8192"
    });
    return reply.choices[0].messages[0].content;
};

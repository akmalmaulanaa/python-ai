import React, { useState, useEffect } from "react";
import { Groq } from "groq-sdk";

const GROQ_API = process.env.VITE_GROQ; // Assuming you store the key in an environment variable

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

const requestToGroqAi = async (content) => {
  try {
    const reply = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content,
        },
      ],
      model: "llama3-8b-8192",
    });
    return reply.choices[0].messages.content;
  } catch (error) {
    console.error("Error fetching response from Groq AI:", error);
    return "Error: Unable to process request."; // Provide user feedback
  }
};

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
    const content = document.getElementById("content").value;
    const aiResponse = await requestToGroqAi(content);
    setData(aiResponse);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center">
      <h1 className="text-4xl text-indigo-500">REACT|GROQ AI</h1>

      <input
        className="px-4 py-2 rounded-md mt-2"
        type="text"
        id="content"
        placeholder="masukan perintah"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md mt-5"
      >
        kirim
      </button>
      <div className="text-white">{data}</div>
    </main>
  );
}

export default App;

"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader";
import PromptBox from "./components/PromptBox";
import ResultWithSources from "./components/ResultWithSources";
import Title from "./components/Title";
import TwoColumnLayout from "./components/TwoColumnLayout";

const API_ENDPOINT = `/api/home`;

const users = [
  { name: "Girl", key: "girl" },
  { name: "Middle Aged Man", key: "middle_aged_man" },
  { name: "Young Man", key: "young_male" },
];

const Home = () => {
  const [userPicked, setUserPicked] = useState(null);
  const [userData, setUserData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [firstMsg, setFirstMsg] = useState(true);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm working on a summary for you, give me just a second.",
      type: "bot",
    },
  ]);

  useEffect(() => {
    if (userPicked) {
      fetchUserData(userPicked);
    }
  }, [userPicked]);

  const fetchUserData = async (user) => {
    try {
      // const response = await fetch(`${API_ENDPOINT}`);
      // const json = await response.json();
      // setUserData(json);
      // setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching transcript. Please try again.");
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handlePromptSubmit = async () => {
    try {
      // Push the user's message into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      const response = await sendPrompt(prompt, firstMsg);

      console.log({ response });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchRes = await response.json();

      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.output.text,
          type: "bot",
        },
      ]);

      setPrompt("");
      setFirstMsg(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching transcript. Please try again.");
    }
  };

  const sendPrompt = async (prompt, firstMsg) => {
    return await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, firstMsg }),
    });
  };

  return (
    <>
      <Title emoji="💬" headingText="Sports Career AI" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Your AI Sports Career Coach"
              boldText="This tool lets you get personalized career advice depending on your data. "
              description="To get started just ask any question and we'll get you an answer."
            />
          </>
        }
        rightChildren={
          <>
            {userPicked === null && (
              <>
                {users.map((user) => {
                  const { name, key } = user;
                  return (
                    <button
                      key={key}
                      onClick={() => setUserPicked(key)}
                      className="py-2 px-6 mb-4 rounded-full border border-gray-500 shadow hover:shadow-lg bg-white hover:bg-white"
                    >
                      {name}
                    </button>
                  );
                })}
              </>
            )}
            {userPicked !== null && (
              <>
                <ResultWithSources messages={messages} pngFile="youtube" />
                <PromptBox
                  prompt={prompt}
                  handlePromptChange={handlePromptChange}
                  handleSubmit={handlePromptSubmit}
                  placeHolderText={"Ask any question"}
                  error={error}
                />
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default Home;

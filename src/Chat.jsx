import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState, useRef } from "react";
import { Message } from "./models";
import { User } from "./models";

export const Chat = ({ user }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Message).subscribe(
      (snapshot) => {
        setMessages([...snapshot.items]);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  const handleSendMessage = async () => {
    await DataStore.save(new Message({ user: user, content: messageInput }));
    setMessageInput("");
  };

  return (
    <div className="w-96 flex flex-col">
      <div className="pl-2 flex-grow w-full">
        {messages.map((message) => (
          <div className="flex justify-center" key={message.id}>
            <div className="mr-auto text-pink-400">
              {message.user?.username}
            </div>
            <div className="text-gray-600">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="h-16 bg-green-300 flex justify-around items-center rounded-md">
        <div>
          <input
            className=" bg-white font-semibold text-black rounded-md pl-1"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          ></input>
        </div>
        <button
          className="bg-trasparent text-white border-2 border-white rounded-md px-2 hover:shadow"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

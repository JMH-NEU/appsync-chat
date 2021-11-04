import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState, useRef } from "react";
import { Message } from "./models";
import { User } from "./models";

export const Chat = ({ user }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([{ name: "", content: "" }]);
  const messagesRef = useRef([{ name: "", content: "" }]);

  const subscription = DataStore.observe(Message).subscribe((msg) => {
    // messagesRef.current = [
    //   ...messagesRef.current,
    //   { name: msg.element.user.username, content: msg.element.content },
    // ];
    // setMessages(messagesRef.current);
    console.log(msg);
  });

  const handleSendMessage = async () => {
    await DataStore.save(new Message({ user: user, content: messageInput }));
    setMessageInput("");
  };

  return (
    <div className="w-96 flex flex-col">
      <div className="pl-2">
        {messages.forEach((message) => (
          <div className="flex justify-center">
            <div className="mr-auto text-pink-400">{message.name}</div>
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

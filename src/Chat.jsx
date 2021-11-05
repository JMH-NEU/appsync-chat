import { DataStore } from "@aws-amplify/datastore";
import { useEffect, useState, useRef } from "react";
import { Message } from "./models";
import { User } from "./models";

export const Chat = ({ user }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef([]);

  const setSubscription = () => {
    const subscription = DataStore.observe(Message).subscribe(async (event) => {
      console.log(event);
      if (
        messageRef.current.filter((message) => message.id === event.element.id)
          .length > 0
      )
        return;
      const messageUser = await DataStore.query(
        User,
        event.element.messageUserId
      );
      const { content, id } = event.element;
      messageRef.current = [
        ...messageRef.current,
        { content, id, user: messageUser },
      ];
      setMessages(messageRef.current);
    });
    return subscription;
  };

  useEffect(() => {
    const subscription = setSubscription();
    return () => subscription.unsubscribe();
  }, []);

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

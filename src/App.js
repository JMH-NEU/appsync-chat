import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Chat } from "./Chat";
import { DataStore } from "@aws-amplify/datastore";
import { Message } from "./models";
import { User } from "./models";

function App() {
  const [user, setUser] = useState(undefined);
  const [nameInput, setNameInput] = useState("");

  const handleJoinChat = async () => {
    if (nameInput === "") return;

    const newUser = await DataStore.save(new User({ username: nameInput }));
    setUser({ ...newUser });
    setNameInput("");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {user ? (
        <div className="self-end mr-auto">
          <Chat user={user} />
        </div>
      ) : (
        <div className="w-96 h-28 bg-green-300 flex justify-around items-center rounded-md">
          <div>
            <input
              className=" bg-white font-semibold text-green-300 rounded-md pl-1"
              placeholder="Full Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            ></input>
          </div>
          <button
            className="bg-trasparent text-white border-2 border-white rounded-md px-2 hover:shadow"
            onClick={handleJoinChat}
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

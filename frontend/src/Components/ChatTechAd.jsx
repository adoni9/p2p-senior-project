import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSendMessage } from "../Hooks/useSendMessage";
import { formatDistanceToNow } from "date-fns";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChat, removeChat } from "../features/chat/chatSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
let socket = io("https://mainkaju.onrender.com");
const ChatTechAd = ({ user }) => {
  const todo = useSelector((state) => state.chat.chat);
  const dispatch2 = useDispatch();
  const { sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const [collector, setCollector] = useState([]);
  const [collector2, setCollector2] = useState([]);
  const [bench, setBench] = useState(null);
  const [bench2, setBench2] = useState(null);
  const [idd, setIdd] = useState("");
  const [name, setname] = useState("");
  const [width, setWidth] = useState("");
  const [mMSG, setMMSG] = useState("");
  const [visible, setVisible] = useState(false);
  // let { user, dispatch } = useUserContext();
  // let { chat, dispatchChat } = useUserContextChat();
  if (user == "") return;
  let chat = todo;
  let token = user ? "Bearer " + user.token : "";
  if (token == "Bearer " + undefined) {
    token = user ? "Bearer " + user.token : "";
  }
  const profile = user ? user.image : "";
  const Firstname = user ? user.firstname : "";
  const Lastname = user ? user.lastname : "";
  const Id = user._id;
  //console.log("the chat tech", user);
  let response;
  useEffect(() => {
    console.log("the idddd is", idd);
    const featcher = async () => {
      response = await fetch(`${API_BASE_URL}/api/Chat/GetChat`, {
        method: "POST",
        body: JSON.stringify({
          adminId: user._id,
          techId: idd,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        //dispatchChat({ type: "SET_CHAT", payload: filteredChat });
        dispatch2(setChat(json));
      }
      // setCollector2(filteredChat);
      // console.log("The collector2 ", collector2);
    };
    featcher();
    featcher3(idd);
  }, [dispatch2]);

  const featcher2 = async () => {
    response = await fetch(`${API_BASE_URL}/api/admin/GetAdmin`, {});
    const json = await response.json();
    setCollector(json);
  };
  useEffect(() => {
    socket.on("ShowTech", (msg) => {
      setMMSG(msg);
      featcher2();
      console.log("the message");
    });
    return () => {
      socket.off("ShowTech");
    };
  }, [dispatch2]);
  useEffect(() => {
    socket.on("Deleted", (msg) => {
      featcher3(msg);
      setVisible(true);
      console.log("the message Deleted");
    });
    return () => {
      socket.off("Deleted");
    };
  }, [dispatch2]);

  const featcher3 = async (id) => {
    response = await fetch(`${API_BASE_URL}/api/Chat/GetChat`, {
      method: "POST",
      body: JSON.stringify({
        adminId: user._id,
        techId: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const json = await response.json();
      //dispatchChat({ type: "SET_CHAT", payload: filteredChat });
      dispatch2(setChat(json));
    }
    // setCollector2(filteredChat);
    // console.log("The collector2 ", collector2);
    // console.log("The filteredChat ", filteredChat);
  };

  useEffect(() => {
    featcher2();
  }, []);
  const SendMessage = async (e) => {
    e.preventDefault();
    setMessage("");
    await sendMessage(Id, idd, message, profile);
    if (message !== "") {
      const messageData = {
        Sender_id: Id,
        Receiver_id: idd,
        Message: message,
        image: profile,
      };
      socket.emit("send_message2", messageData);
      featcher3(idd);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (msg.Receiver_id === Id) {
        setBench(msg.Message);
        setBench2(msg.Message);
        featcher3(msg.Sender_id);
      }
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const clicked = (id, name, profile) => {
    setVisible(!visible);
    setIdd(id);
    setname(name);
    featcher3(id);
    setBench(null);
  };
  const handleDelete = async (id, _id) => {
    const response = await fetch(`${API_BASE_URL}/api/Chat/${_id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    const json = response.json();
    socket.emit("Deleted2", Id);
    dispatch2(removeChat(_id));
    //dispatch2(setChat(json));
  };

  return (
    <div>
      <div className=" ml-10 w-96 h-80 ">
        <h1 className="text-3xl font-mono text-white">Messages</h1>
        <div className="flex">
          <div className=" h-96 w-80 border-r-2 border-gray-100  mt-16">
            {collector &&
              collector.map((r, index) => (
                <div
                  key={index}
                  onClick={() => clicked(r._id, r.firstname, r.image)}
                  className="w-72 h-24  border-b-2 border-gray-100 flex hover:bg-slate-100"
                >
                  <div className="ml-4 mt-4">
                    <img
                      src={r.image}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  </div>
                  <div className="mt-3 ml-3 font-semibold text-2xl ">
                    {r.firstname}
                  </div>
                </div>
              ))}
          </div>
          <div className=" w-[650px] overflow-y-scroll h-[550px] absolute ml-80">
            <div className="ml-5 w-[500px] mt-5 flex border-b-2 border-gray-200 h-20 bg-slate-100">
              <img
                src={user.image}
                className="w-[60px] h-[60px] rounded-full ml-3 mt-2"
              />
              <div className="ml-3 mt-2 flex">
                <div className="font-bold">{Firstname}</div>

                <div className="ml-2 font-bold">{Lastname}</div>
              </div>
            </div>
            {visible &&
              chat.map((r, index) => (
                // "border-b-2 border-gray-200 flex ml-[250px] " + width
                <div
                  key={index}
                  // onClick={() => clicked(r._id, r.Message)}
                  className={
                    r.Sender_id === Id
                      ? "ml-[250px] overflow-y-auto   flex mt-3 "
                      : "ml-[0px] overflow-y-auto  flex mt-3 "
                  }
                >
                  <div
                    className={
                      r.Sender_id === Id
                        ? "absolute ml-[300px] mt-4"
                        : " mt-4 mr-3 ml-5 "
                    }
                  >
                    <img
                      src={r.image}
                      className="w-[40px] h-[40px] rounded-full  "
                    />
                  </div>
                  {/* "absolute ml-[300px] mt-4" */}
                  <div
                    className={
                      r.Sender_id === Id
                        ? "mt-4  border-2  flex  w-60 h-16 bg-green-500 rounded-r-lg rounded-b-lg text-white"
                        : "mt-4  border-2  flex  w-72 h-16 bg-gray-200 rounded-r-lg rounded-b-lg"
                    }
                  >
                    <div>
                      <h1 className="ml-1 mt-1 overflow-y-auto">{r.Message}</h1>
                      <p className="ml-1 mt-1">
                        {formatDistanceToNow(new Date(r.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <div
                      className={
                        r.Sender_id === Id
                          ? "absolute ml-[-35px] mt-2"
                          : "absolute mt-2 mr-3 ml-[220px] "
                      }
                    >
                      {r.Sender_id === Id && (
                        <button
                          className="bg-red-500 w-8 h-4 rounded-md font-semibold text-[10px] hover:bg-fuchsia-600"
                          onClick={() => handleDelete(r.id, r._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {visible && (
              <div className="mt-[70px] ml-16">
                <form onSubmit={SendMessage}>
                  <input
                    placeholder="Message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-b-2 rounded-lg border-b-green-500 focus:outline-none mb-5"
                  />
                  <div className={message === "" ? "hidden" : "visible"}>
                    <div className="bg-green-500 flex w-20 h-[40px] ml-80 mt-[-50px] rounded-lg cursor-pointer hover:bg-yellow-400">
                      <button>
                        <IoSend className="mt-1 ml-6 text-[30px] hover:text-purple-700" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* {bench && bench} */}
        </div>
      </div>
    </div>
  );
};

export default ChatTechAd;

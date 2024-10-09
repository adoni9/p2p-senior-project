import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import { useSendMessage } from "../Hooks/useSendMessage";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MdCircle } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { setChat, removeChat } from "../features/chat/chatSlice";
const AdminChat = ({ user3, counter }) => {
  user3 = user3[0];
  const todo = useSelector((state) => state.chat.chat);
  const dispatch2 = useDispatch();
  const { sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const [mMSG, setMMSG] = useState("");
  const [collector, setCollector] = useState([]);
  const [bench, setBench] = useState(null);
  const [bench2, setBench2] = useState(null);
  const [idd, setIdd] = useState("");
  const [name, setname] = useState("");
  const [visible, setVisible] = useState(false);
  const [Counter, setCounter] = useState(0);
  const [SenderId, setSenderId] = useState(0);
  let socket = io("https://mainkaju.onrender.com");
  //let { admin, dispatch } = useUserContextA();
  let chat = todo;
  const [profile2, setProfile] = useState("");
  let response;
  useEffect(() => {
    const featcher = async () => {
      response = await fetch(`${API_BASE_URL}/api/Chat/GetChat`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          adminId: user3._id,
          techId: idd,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        // dispatchChat({ type: "SET_CHAT", payload: filteredChat });
        dispatch2(setChat(json));
      }
      // setCollector2(filteredChat);
      // console.log("The collector2 ", collector2);
    };
    featcher();
    featcher3(idd);
  }, [dispatch2]);

  const featcher3 = async (id) => {
    response = await fetch(`${API_BASE_URL}/api/Chat/GetChat`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        adminId: user3._id,
        techId: id,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      //dispatchChat({ type: "SET_CHAT", payload: filteredChat });
      dispatch2(setChat(json));
    }
    // setCollector2(filteredChat);
    // console.log("The collector2 ", collector2);
  };
  const featcher2 = async () => {
    response = await fetch(`${API_BASE_URL}/api/User/GetUser`, {});
    const json = await response.json();
    setCollector(json);
    console.log("in featcher");
  };
  useEffect(() => {
    socket.once("ShowTech", (msg) => {
      setMMSG(msg);
      featcher2();
      console.log("the message");
    });

    return () => {
      socket.off("ShowTech");
    };
  }, [dispatch2]);
  useEffect(() => {
    socket.on("Deleted2", (msg) => {
      featcher3(msg);
      console.log("the message Deleted3");
    });
    return () => {
      socket.off("Deleted2");
    };
  }, [dispatch2]);

  useEffect(() => {
    featcher2();
  }, [mMSG]);
  const SendMessage = async (e) => {
    e.preventDefault();
    setMessage("");
    await sendMessage(user3._id, idd, message, user3.image);
    if (message !== "") {
      const messageData = {
        Sender_id: user3._id,
        Receiver_id: idd,
        Message: message,
        image: user3.image,
      };
      socket.emit("send_message", messageData);
      featcher3(idd);
    }
  };

  useEffect(() => {
    socket.on("receive_message2", (msg) => {
      if (msg.Receiver_id === user3._id) {
        setBench(msg.Message);
        setBench2(msg.Message);
        setSenderId(msg.Sender_id);
        featcher3(idd);
        setCounter(1);
        counter(1);
      }
    });
    return () => {
      socket.off("receive_message2");
    };
  }, [socket]);

  const clicked = (id, name, profile2) => {
    setVisible(!visible);
    setIdd(id);
    setname(name);
    featcher3(id);
    setBench(null);
    setProfile(profile2);
    setCounter(0);
  };
  const handleDelete = async (id, _id) => {
    const response = await fetch(`${API_BASE_URL}/api/Chat/${_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch2(removeChat(_id));
    socket.emit("Deleted", user3._id);
  };
  return (
    <div>
      <div className="mt-20 ml-36">
        <h1 className="text-3xl font-mono">Messages</h1>
        <div className="flex">
          <div className=" h-96 w-80 border-r-2 border-gray-100  mt-16">
            {collector &&
              collector.map((r, index) => (
                <div
                  key={index}
                  onClick={() => clicked(r._id, r.firstname, r.image)}
                  className="w-72 h-24  border-b-2 border-gray-100 flex hover:bg-slate-300"
                >
                  {r._id.toString() == SenderId && (
                    <div className="ml-72 absolute">
                      {Counter > 0 ? (
                        <div className="">
                          <p className="absolute mt-1 ml-2 font-bold text-white">
                            {Counter}
                          </p>
                          <MdCircle className="text-blue-500 text-2xl" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  <div className="ml-4 mt-4">
                    <img
                      src={r.image}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  </div>
                  <div className=" ">
                    <p className="mt-3 ml-3 font-semibold text-2xl">
                      {r.firstname}
                    </p>
                    <p className="mt-3 ml-3">{r.email}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className=" w-[650px] overflow-y-scroll h-[550px] absolute ml-80">
            <div className="ml-5 mt-5 flex border-b-2 border-gray-200 h-20 bg-slate-100">
              <img
                src={user3.image}
                className="w-[60px] h-[60px] rounded-full ml-3 mt-2"
              />
              <div className="ml-3 mt-2 flex">
                <div className="font-bold">{user3.firstname}</div>

                <div className="ml-2 font-bold">{user3.lastname}</div>
              </div>
            </div>
            {visible &&
              chat.map((r, index) => (
                // "border-b-2 border-gray-200 flex ml-[250px] " + width
                <div
                  key={index}
                  className={
                    r.Sender_id === user3._id
                      ? "ml-[250px]   flex mt-3 "
                      : "ml-[0px]  flex mt-3 "
                  }
                >
                  <div
                    className={
                      r.Sender_id === user3._id
                        ? "absolute ml-[300px] mt-4"
                        : "mt-4 mr-3 ml-5 "
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
                      r.Sender_id === user3._id
                        ? "mt-4  border-2  flex  w-72 h-16 bg-green-500 rounded-r-lg rounded-b-lg text-white"
                        : "mt-4  border-2  flex  w-72 h-16 bg-gray-200 rounded-r-lg rounded-b-lg"
                    }
                  >
                    <div>
                      <h1 className="ml-3 mt-1">{r.Message}</h1>
                      <p className="ml-3 mt-1">
                        {formatDistanceToNow(new Date(r.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <div
                      className={
                        r.Sender_id === user3._id
                          ? "absolute ml-[-35px] mt-2"
                          : "absolute mt-2 mr-3 ml-[260px] "
                      }
                    >
                      {r.Sender_id === user3._id && (
                        <button
                          className="bg-red-500 w-8 h-4 rounded-md font-semibold text-[10px] hover:bg-fuchsia-600"
                          onClick={() => handleDelete(r.id, r._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    {/* "mt-4  border-2  flex  w-72 h-11" */}
                  </div>
                </div>
              ))}
            {/* <div className="bg-fuchsia-600">
            {idd && (
              <div className="flex">
                <img
                  src={"/images/" + profile}
                  className="w-[60px] h-[60px] rounded-full"
                />
                <div className="ml-3 font-bold">{name}</div>
              </div>
            )}
          </div> */}
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

export default AdminChat;

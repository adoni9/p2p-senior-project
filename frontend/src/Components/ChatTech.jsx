import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSendMessage } from "../Hooks/useSendMessage";
import { formatDistanceToNow } from "date-fns";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoIosWarning } from "react-icons/io";
import { setChat, removeChat } from "../features/chat/chatSlice";
import { updateTech, setTech } from "../features/tech/techSlice";
import { updateCart, setCart, removeCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
let socket = io("https://mainkaju.onrender.com");
const ChatTech = ({ user, owner, tPrice, itemId }) => {
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
  const [Sccess, setSccess] = useState(null);
  const [Error2, setError2] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState("");
  const [visible3, setVisible3] = useState(true);
  const MyMessage = "You have payed Successfully";
  // Ensure myCart is truthy before accessing its properties
  const myCart = useSelector((state) => state.cart.cart);
  const toastify = (message) => {
    setError2(null);
    setVisible3(false);
    toast.error(message, {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };

  // let { user, dispatch } = useUserContext();
  // let { chat, dispatchChat } = useUserContextChat();

  let chat = todo;
  let token = user ? "Bearer " + user.tk : "";
  if (token == "Bearer " + undefined) {
    token = user ? "Bearer " + user.token : "";
  }
  const profile = user ? user.image : "";
  const Firstname = user ? user.firstname : "";
  const Lastname = user ? user.lastname : "";
  const Id = user._id;
  const Id2 = user.id;
  let response;
  useEffect(() => {
    const featcher = async () => {
      response = await fetch(`${API_BASE_URL}/api/Chat/GetChat`, {
        method: "POST",
        body: JSON.stringify({
          adminId: user._id,
          techId: owner,
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
    featcher3(owner);
  }, [dispatch2]);

  const featcher2 = async () => {
    console.log("the featcher", owner);
    response = await fetch(`${API_BASE_URL}/api/user/GetOneUserById/${owner}`);
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
  };

  useEffect(() => {
    featcher2();
  }, []);
  const SendMessage = async (e) => {
    e.preventDefault();
    setMessage("");
    await sendMessage(Id, owner, message, profile);
    if (message !== "") {
      const messageData = {
        Sender_id: Id,
        Receiver_id: owner,
        Message: message,
        image: profile,
      };
      socket.emit("send_message2", messageData);
      featcher3(owner);
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
  useEffect(() => {
    socket.on("receive_message2", (msg) => {
      console.log("msg", msg);
      if (msg.Receiver_id === Id) {
        setBench(msg.Message);
        setBench2(msg.Message);
        featcher3(msg.Sender_id);
        console.log(msg.Message);
      }
    });
    return () => {
      socket.off("receive_message2");
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
  //HandleMerchantPayment
  const HandleMerchantPayment = async () => {
    const paymentData = { owner: owner, money: money, itemId: itemId };
    const response = await fetch(
      `${API_BASE_URL}/api/payment/merchantPayment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(paymentData),
      }
    );
    if (response.ok) {
      const payment = await response.json();
      console.log("the payment", payment);

      dispatch2(
        updateCart({
          itemId: payment.updateCart.itemId,
          status: payment.updateCart.status,
        })
      );
    } else {
      const payment = await response.json();
      setError2(payment.message);
    }
  };
  //
  const HandlePayment = async () => {
    const paymentData = { money: tPrice, itemId: itemId };
    const response = await fetch(
      `${API_BASE_URL}/api/payment/preAuthorizePayment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(paymentData),
      }
    );
    if (response.ok) {
      const payment = await response.json();
      console.log("the payment", payment);
      await notify(payment.updateCart);
      dispatch2(
        updateTech({
          id: Id2,
          firstname: Firstname,
          lastname: Lastname,
          gender: payment.balance.gender,
          phonenumber: payment.balance.mobileMoney,
          deposit: payment.balance.deposite,
          email: payment.balance.email,
          image: profile,
          location: payment.balance.location,
          _id: payment.balance._id,
        })
      );
      setSccess(MyMessage);
      dispatch2(
        updateCart({
          itemId: payment.updateCart.itemId,
          status: payment.updateCart.status,
          money: payment.updateCart.money,
        })
      );
    } else {
      const payment = await response.json();
      setError2(payment.message);
    }
  };
  //notify
  const notify = async (Carts) => {
    const response = await fetch(`${API_BASE_URL}/api/notify/notifyCreat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: owner,
        buyerName: user.firstname,
        buyerLocation: user.location,
        tPrice: tPrice,
        category: Carts.category,
        image: Carts.image,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      socket.emit("MyNotify", { file: json, owner: owner });
    }
  };
  const toastify2 = (message) => {
    setSccess(null);
    toast.success(message, {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/GetOneCart/${itemId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const json = await response.json();
        // dispatch2(setCart([json]));
        setVisible2(json);
      }
    };
    getCart();
  }, [dispatch2, itemId]);

  let IdC = null;
  let status = null;
  let money = null;
  if (myCart.length > 0) {
    const filteredItems = myCart.filter((item) => item.itemId === itemId);
    if (filteredItems.length > 0) {
      IdC = itemId;
      status = filteredItems[0].status;
      money = filteredItems[0].money;
      console.log("in the myCart", filteredItems);
    }
  }
  const HandleDelete = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/cart/deleteCart/${itemId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const json = await response.json();
      dispatch2(removeCart(itemId));
    }
  };
  return (
    <div>
      <div className="mt-20 ml-36 ">
        <h1 className="text-3xl font-mono text-white">Messages</h1>
        <div className="flex">
          <div className=" h-96 w-80 border-r-2 border-gray-100  mt-16 ">
            {collector &&
              collector.map((r, index) => (
                <div
                  key={index}
                  onClick={() => clicked(r._id, r.firstname, r.image)}
                  className="w-72 h-24  border-b-2 border-gray-100 flex hover:bg-slate-100 hover:text-black text-white"
                >
                  <div className="ml-4 mt-4">
                    <img
                      src={r.image}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  </div>
                  <div className="mt-3 ml-3 font-semibold text-2xl">
                    {r.firstname}
                  </div>
                </div>
              ))}
          </div>
          <div className=" w-[650px] overflow-y-scroll h-[400px] absolute ml-80 mt-[-40px]">
            <div className="ml-5 mt-5 flex border-b-2 border-gray-200 h-20 bg-slate-100">
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
                      ? "ml-[250px]   flex mt-3 "
                      : "ml-[0px]  flex mt-3 "
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
                        r.Sender_id === Id
                          ? "absolute ml-[-35px] mt-2"
                          : "absolute mt-2 mr-3 ml-[260px] "
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
        {console.log("the my itemId is ", itemId)}
        {console.log("the my status is ", status)}
        {status == "unpaid" && tPrice != 0 ? (
          <div className="mt-[-250px] ml-10 border-2 h-10 w-44 rounded-lg bg-green-500">
            <button className="text-white ml-14 mt-1" onClick={HandlePayment}>
              Confirm
            </button>
          </div>
        ) : status === "paid" && tPrice != 0 ? (
          <div className="mt-[-250px] ml-10 border-2 h-14 w-44 rounded-lg bg-red-500 hover:bg-red-400">
            <button
              className="text-white ml-1 mt-1 font-bold"
              onClick={HandleMerchantPayment}
            >
              Have You Received the Goods?
            </button>
            <div className="flex mt-5">
              <IoIosWarning className="text-yellow-300 text-[40px]" />
              <p className="text-[12px] text-white ml-3">
                You must Click Only You Have Received it
              </p>
            </div>
          </div>
        ) : status == "completed" && tPrice != 0 ? (
          <div className="mt-[-250px] ml-10 border-2 h-16 w-44 rounded-lg bg-green-500">
            <button className="text-white ml-4 mt-3" onClick={HandleDelete}>
              Purchase Completed
            </button>
          </div>
        ) : status == "unpaid" && tPrice == 0 ? (
          <div className="mt-[-250px] ml-10 border-2 h-10 w-44 rounded-lg bg-green-500">
            <button className="text-white ml-14 mt-1">Unpaid</button>
          </div>
        ) : status == "paid" && tPrice == 0 ? (
          <div className="mt-[-250px] ml-10 border-2 h-10 w-44 rounded-lg bg-green-500">
            <button className="text-white ml-14 mt-1">paid</button>
          </div>
        ) : (
          <div>hI hi</div>
        )}
        {status == "unpaid" && (
          <div className="mt-5  ml-12">
            <p className="font-bold text-white">Total Amount:{tPrice}</p>
            {Sccess && toastify2(MyMessage)}
            {Error2 && toastify(Error2)}
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTech;

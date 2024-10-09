const Chat = require("../Model/Chat");
const { ObjectId } = require("mongodb");
//Sign Up
const ChatCreate = async (req, res) => {
  const { Sender_id, Receiver_id, Message, image } = req.body;

  const chats = await Chat.create({
    Sender_id,
    Receiver_id,
    Message,
    image,
  });

  res.status(200).json([chats]);
};

//Get all(if Super Admin is Available for the future)

const GetChat = async (req, res) => {
  const { adminId, techId } = req.body;
  console.log("adminId", adminId);
  console.log("techId", techId);
  try {
    const messages = await Chat.find({
      $or: [
        { Sender_id: adminId, Receiver_id: techId },
        { Sender_id: techId, Receiver_id: adminId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error fetching messages:", error);
  }
};

//delete chat

const DeleteChat = async (req, res) => {};
const deleteCT = async (req, res) => {
  const { id } = req.params;
  const sv = await Chat.findOneAndDelete({ _id: id });
  if (!sv) {
    return res.status(400).json({ msg: "No id found" });
  }
  const chat = await Chat.find({});
  res.status(200).json(chat);
};
module.exports = {
  ChatCreate,
  GetChat,
  DeleteChat,
  deleteCT,
};

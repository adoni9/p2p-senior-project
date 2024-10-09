const axios = require("axios");
const { Chapa } = require("chapa-nodejs");
const User = require("../Model/User");
const Cart = require("../Model/Cart");
const Car = require("../Model/Car");
const House = require("../Model/House");
const Electronics = require("../Model/Electronics");
const Withdraw = require("../Model/Withdraw");
const CHAPA_BASE_URL = process.env.CHAPA_BASE_URL;
const CHAPA_TEST_SECRET_KEY = process.env.CHAPA_TEST_SECRET_KEY;
const chapa = new Chapa({
  secretKey: CHAPA_TEST_SECRET_KEY,
});
const checkPlatformBalance = async (req, res) => {
  try {
    const response = await axios.get(`${CHAPA_BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error checking platform balance",
      error: error.message,
    });
  }
};
//Payment
const preAuthorizePayment = async (req, res) => {
  const id = req.User._id;
  const paymentData = req.body;
  const customer = await User.findById(id);
  try {
    if (customer.deposite >= paymentData.money) {
      const deposite = customer.deposite - paymentData.money;
      const balance = await User.findByIdAndUpdate(
        { _id: id },
        { deposite: deposite },
        { new: true }
      );

      const requiredCart = await Cart.findOne({ itemId: paymentData.itemId });
      const updateCart = await Cart.findByIdAndUpdate(
        { _id: requiredCart._id },
        { status: "paid", money: paymentData.money },
        { new: true }
      );
      const Category = requiredCart.category;
      let Carts;
      if (Category == "car") {
        Carts = await Car.findOne({ _id: paymentData.itemId });
      }
      if (Category == "house") {
        Carts = await House.findOne({ _id: paymentData.itemId });
      }
      if (Category == "electronics") {
        Carts = await Electronics.findOne({ _id: paymentData.itemId });
      }
      res
        .status(200)
        .json({ balance: balance, updateCart: updateCart, Carts: Carts });
    } else {
      throw Error("insufficient Balance");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//merchantPayment
const merchantPayment = async (req, res) => {
  const paymentData = req.body;
  const requiredCart = await Cart.findOne({ itemId: paymentData.itemId });
  const customer = await User.findById(paymentData.owner);
  try {
    const deposite = customer.deposite + requiredCart.money;
    const balance = await User.findByIdAndUpdate(
      { _id: paymentData.owner },
      { deposite: deposite },
      { new: true }
    );
    const updateCart = await Cart.findByIdAndUpdate(
      { _id: requiredCart._id },
      { status: "completed" },
      { new: true }
    );

    res.status(200).json({ balance: balance, updateCart: updateCart });
  } catch (error) {
    console.log("the error", error);
    res.status(500).json({ message: error.message });
  }
};
//Recharge Account
const rechargeBalance = async (req, res) => {
  const id = req.User._id;
  const fname = req.User.firstname;
  const lname = req.User.lastname;
  const email = req.User.email;
  const paymentData = req.body;
  console.log("paymentData", email);
  console.log("fname", fname);
  const customer = await User.findById(id);
  const tx_ref = await chapa.generateTransactionReference();
  try {
    const response = await chapa.initialize({
      first_name: fname,
      last_name: lname,
      email: email,
      currency: "ETB",
      amount: paymentData.money,
      tx_ref: tx_ref,
      callback_url: "https://google.com",
      return_url: paymentData.return_url,
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    });
    const Detail = response.data;
    const deposite = customer.deposite + parseInt(paymentData.money);
    const balance = await User.findByIdAndUpdate(
      { _id: id },
      { deposite: deposite },
      { new: true }
    );
    res.status(200).json({ Detail, tx_ref, balance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error pre-authorizing payment", error: error.message });
    console.log("the error is", error);
  }
};

const capturePayment = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const response = await axios.post(
      `${CHAPA_BASE_URL}/transaction/capture/${transactionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error capturing payment", error: error.message });
  }
};

const payoutToSeller = async (req, res) => {
  // const { amount } = req.body;
  // const { id } = req.params;
  // const sellerId = id;
  try {
    // const balance = await axios.get(`${CHAPA_BASE_URL}/balance`, {
    //   headers: {
    //     Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
    //   },
    // });
    // console.log("the balance", balance);

    // const seller = await User.findById(sellerId);
    // if (!seller) {
    //   return res.status(404).json({ message: "Seller not found" });
    // }

    // const payoutData = {
    //   amount,
    //   recipient: {

    //     bank_account: seller.bankAccount,
    //     mobile_money: seller.mobileMoney,
    //   },
    // };

    const response = await axios.get(`${CHAPA_BASE_URL}/banks`, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};
const transferToSeller = async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(`${CHAPA_BASE_URL}/transfers`, data, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};
const verifyPayment = async (req, res) => {
  const { tx_ref, status } = req.body;
  try {
    const response = await chapa.verify({
      tx_ref,
    });
    console.log("the response is", response.data);
    if (response.data.status === "success") {
      // Logic to recharge user's virtual balance
      console.log(" i am going to rechage your balance");
    } else {
      console.log(" try again to rechage your balance");
    }
    res.status(200).json(response.data);
  } catch (error) {
    console.log("the error is", error);
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};
//UpdateDeposit
const UpdateDeposit = async (req, res) => {
  const { Deposit, custEmail } = req.body;
  const user = await User.findOne({ email: custEmail });
  const Users = await User.findByIdAndUpdate(
    { _id: user._id },
    { deposite: Deposit }
  );
  res.status(200).json(Users);
};
//withdraw
const withdraw = async (req, res) => {
  const postData = req.body;
  console.log("the post data is ", postData);
  const data = await Withdraw.create({
    fullname: postData.fullname,
    email: postData.email,
    bank: postData.bank,
    amount: postData.amount,
    accountNumber: postData.accountNumber,
  });
  res.status(200).json(data);
};
//
const GetAllWithdraw = async (req, res) => {
  const data = await Withdraw.find({});
  res.status(200).json(data);
};

module.exports = {
  checkPlatformBalance,
  preAuthorizePayment,
  capturePayment,
  payoutToSeller,
  transferToSeller,
  verifyPayment,
  rechargeBalance,
  merchantPayment,
  UpdateDeposit,
  withdraw,
  GetAllWithdraw,
};

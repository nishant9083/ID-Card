const transaction = require("../models/Transaction");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    const { mess } = req.body;
    try {
      const data = await transaction.find({ account_from: mess });      
      res.json({
        success: true,
        message: "Transaction data retrieved successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

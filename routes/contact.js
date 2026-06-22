const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const saved = await Message.create({ name, email, message });
    res.status(201).json({ message: "Message sent successfully", data: saved });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// GET all messages (admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;

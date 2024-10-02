const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Enable CORS to allow communication between frontend and backend
app.use(express.json());

// POST request to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validation (optional)
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the form data to the database via Prisma
    const newMessage = await prisma.message.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        message,
      },
    });

    res.status(201).json({
      message: "Quote request submitted successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error occurred while submitting the message:", err);
    res.status(500).json({ message: "Failed to submit quote request" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

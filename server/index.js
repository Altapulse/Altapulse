const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: [
    "https://altapulse-react-c8ei.vercel.app", // Your first frontend URL
    "https://altapulse-react-c8ei-a9aalxtsz-altapulses-projects.vercel.app", // Your second frontend URL
  ],
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
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

// Sample GET route for testing
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use Render's port or fallback to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

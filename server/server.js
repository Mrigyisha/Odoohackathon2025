// server.js

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express(); // <--- This line defines `app`

const PORT = 5000;

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    console.log("📨 Incoming contact:", { name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 📬 Email to ReVibe (you)
    const ownerMail = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `📧 Message from ${name} <${email}>\n\n${message}`
    };

    await transporter.sendMail(ownerMail);

    // 📩 Auto-reply to sender
    const autoReply = {
      from: `"ReVibe Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out to ReVibe, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting <strong>ReVibe</strong> 🌱</p>
        <p>We've received your message and will get back to you shortly.</p>
        <hr/>
        <p><em>Your message:</em></p>
        <blockquote style="background:#f9f9f9;padding:10px;border-left:3px solid #ccc">${message}</blockquote>
        <br/>
        <p>Cheers,<br/>Team ReVibe</p>
      `
    };

    await transporter.sendMail(autoReply);

    res.status(200).json({ success: true, message: "Message sent!" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Message failed to send" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// pages/api/send-email.js
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, text, html } = req.body;

    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // or another email service
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASS // your email password
        }
      });

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
      };

      const mailhtmlOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
      };

      // Send the email
      await transporter.sendMail(html ? mailhtmlOptions : mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

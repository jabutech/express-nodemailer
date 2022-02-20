const nodemailer = require("nodemailer");
require("dotenv").config();
let path = require("path");

module.exports = {
  sendEmail: async (req, res) => {
    try {
      let transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_DESTINATION,
        subject: "Email dari express js!",
        text: "Yey!, email berhasil dikirim.",
        attachments: [
          {
            filename: "text1.txt", // <-- Nama file
            path: path.join(__dirname, "../file.txt"), // Lokasi file
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      return res
        .status(201)
        .json({ status: "SUCCESS", message: "Email berhasil dikirim." });
    } catch (err) {
      return res.status(500).json({ status: "ERROR", message: err });
    }
  },
};

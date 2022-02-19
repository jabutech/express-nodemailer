const nodemailer = require("nodemailer");
require("dotenv").config();

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
        to: "darmawanrizky43@gmail.com",
        subject: "Email dari express js!",
        text: "Yey!, email berhasil dikirim.",
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

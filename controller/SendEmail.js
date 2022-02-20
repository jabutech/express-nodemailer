// Require nodemailer
const nodemailer = require("nodemailer");
// require handlebars
const hbs = require("nodemailer-express-handlebars");
// Require dotenv
require("dotenv").config();
// Use path
let path = require("path");

module.exports = {
  sendEmail: async (req, res) => {
    try {
      // Object transporter
      let transporter = nodemailer.createTransport({
        // Service mail
        service: process.env.SERVICE,
        // User and password host mail
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Handlebars config
      const handlebarsOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve("./template-mail/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./template-mail/"),
        extName: ".handlebars",
      };

      // Register template handlebars to transporter
      transporter.use("compile", hbs(handlebarsOptions));

      let mailOptions = {
        // Mail host for use send mail
        from: process.env.EMAIL,
        // Destination mail
        to: process.env.EMAIL_DESTINATION,
        // Subject
        subject: "Email dari express js!",
        template: "email", // <-- change property text to template mail
        // Parsing data to template
        context: {
          title: "Email With Nodemailer",
          text: "Yey!, email berhasil dikirim dengan template.",
        },
        // Attachement
        attachments: [
          {
            filename: "text1.txt", // <-- file name
            path: path.join(__dirname, "../file.txt"), // file location
          },
        ],
      };

      // Send mail process
      await transporter.sendMail(mailOptions);

      // Return response success
      return res
        .status(201)
        .json({ status: "SUCCESS", message: "Email berhasil dikirim." });
    } catch (err) {
      // Handle response error
      return res.status(500).json({ status: "ERROR", message: err });
    }
  },
};

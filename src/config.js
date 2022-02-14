import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "96d89f693b40e7", // generated ethereal user
      pass: "9fb8ac5d01ddc9", // generated ethereal password
    },
  });

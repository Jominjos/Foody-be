const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function sendMail(ToMails, Subject, Content) {
  try {
    const info = await transporter.sendMail({
      from: "Qdemy  <qdemycorp@gmail.com>", // sender address
      to: ToMails, // list of receivers
      subject: Subject, // Subject line

      html: Content, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    return e;
  }
  // send mail with defined transport object

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

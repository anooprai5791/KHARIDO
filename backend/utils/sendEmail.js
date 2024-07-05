const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({//creating a temporary mail service provider 
    host:process.env.SMPT_HOST,
    port:process.env.SMPT_PORT,
    secure:true,
    service:process.env.SMPT_SERVICE,
    auth:{
      user:process.env.SMPT_MAIL,//smtp-->simple mail transfer protocol
      pass:process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from:process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
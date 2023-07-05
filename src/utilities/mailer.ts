import nodemailer from "nodemailer";
import "dotenv/config";

import SMTPTransport from "nodemailer/lib/smtp-transport";
import { dataI } from "./interface_utilities/mail.interface";

type NodeMailerI = {
  mailer: (data: dataI) => Promise<any>;
};

class NodeMailer implements NodeMailerI {
  public async mailer(data: dataI): Promise<any> {
    try {
      // Generate test SMTP service account from ethereal.email

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "process.env.EMAIL_HOST",

        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      } as SMTPTransport.Options);

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: process.env.SENDER_MAIL, // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: "<b>kindly follow the instructions to reset your password</b>", // html body
      });

      await transporter.sendMail(info);
    } catch (err: any) {
      console.log(err);
    }
  }
}

export default NodeMailer;

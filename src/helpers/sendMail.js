import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

const sendEmail = async (to,username, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });

        const info = await transporter.sendMail({
            from: `"Arjun Nagar 👊" "arjunnagar801098@gmail.com`, // sender address 
            to: to,
            subject: "Verify Your Email Address",
            text: otp,
            html: `<b>${otp}</b>`
        })

        console.log("Message sent: %s", info.messageId);
        return NextResponse.json(info)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 500
        })
    }

}

export default sendEmail
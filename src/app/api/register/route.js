import connectToDb from "@/dbConnect/connectToDB"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import sendEmail from "@/helpers/sendMail"
import { html } from "@/helpers/htmlOfEmail"

connectToDb()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody

        const user = await User.findOne({ username, email })
        if (user) {
            return NextResponse.json({
                message: "user Already Exist",
                success: false,
                status: 401
            })
        }
        let otp = ""
        for (let i = 0; i < 6; i++) {
            const num = Math.floor(Math.random() * 10)
            otp += num
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            otp: otp,
            otpExpiry: Date.now() + 30 * 60 * 1000
        })

        sendEmail(email, username, otp)

        await newUser.save()
        return NextResponse.json({
            message: "verify Email Now",
            success: true,
            status: 201,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 500
        })
    }
}
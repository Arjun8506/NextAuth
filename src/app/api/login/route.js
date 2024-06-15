import connectToDb from "@/dbConnect/connectToDB"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectToDb()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody

        const validUser = await User.findOne({ email }).lean()
        if (!validUser) {
            return NextResponse.json({
                message: "user not found",
                success: false,
                status: 404
            })
        }
        
        if (validUser.isVerified === false) {
            return NextResponse.json({
                message: "first verify your email",
                success: false,
                status: 404
            })
        }

        const validPassword = await bcryptjs.compare(password, validUser.password)
        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid Credentials",
                success: false,
                status: 401
            })
        }

        const token = jwt.sign({
            id: validUser._id,
            username: validUser.username
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const userWithoutPassword = { ...validUser };
        delete userWithoutPassword.password;

        const response = NextResponse.json({
            success: true,
            statusCode: 200,
            user: userWithoutPassword
        });

        response.cookies.set("tokenNext", token, {
            maxAge: 1 * 24 * 60 * 60, // In seconds for 1 day
            httpOnly: true
        });

        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 500
        })
    }
}
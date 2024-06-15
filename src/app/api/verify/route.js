import connectToDb from "@/dbConnect/connectToDB"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

connectToDb()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { otp } = reqBody

        const validUser = await User.findOne({ otp }).lean()
        if (!validUser) {
            return NextResponse.json({
                message: "user not found",
                success: false,
                status: 404
            })
        }

        if (validUser.otp !== otp) {
            return NextResponse.json({
                message: "Authentication Failed",
                success: false,
                status: 404
            })
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: validUser._id },
            { $set: { isVerified: true }, $unset: { otp: 1, otpExpiry: 1 } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({
                message: "An error occurred during verification.",
                success: false,
                status: 500,
            });
        }

        const response = NextResponse.json({
            message: "Email Verified",
            success: true,
            statusCode: 200,
        });

        return response
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 500
        })
    }
}
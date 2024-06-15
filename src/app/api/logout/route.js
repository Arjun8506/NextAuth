import { NextResponse } from "next/server"

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Loggedout successfully",
            status: 200
        })
        response.cookies.set("tokenNext", "", {
            httpOnly: true,
            maxAge: 0
        })
        return response
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 500
        })
    }
}
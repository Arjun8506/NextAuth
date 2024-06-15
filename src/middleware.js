import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export async function middleware(req) {
    const token = req.cookies.get('tokenNext')?.value; // Access the value property

    const url = req.nextUrl.clone();
    const protectedPaths = ['/', '/profile'];
    const authPaths = ['/login', '/register'];

    if (token) {
        try {
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

            // Check if the token is expired
            if (Date.now() >= payload.exp * 1000) {
                console.error('JWT token is expired');
                throw new Error('JWT token is expired');
            }

            // User is authenticated
            if (authPaths.includes(url.pathname)) {
                // Redirect authenticated user away from login and register pages
                url.pathname = '/'; // Redirect to a default authenticated route, e.g., home
                return NextResponse.redirect(url);
                toast.error("You are authenticated")
            }
        } catch (error) {
            console.error('JWT verification failed:', error);
            // Token is invalid, let the user proceed to auth pages
        }
    } else {
        // User is not authenticated
        if (protectedPaths.includes(url.pathname)) {
            // Redirect unauthenticated user to login page
            toast.error("You are unauthenticated")
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register', '/', '/profile'],
};

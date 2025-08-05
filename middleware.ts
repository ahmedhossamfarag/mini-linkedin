import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";


export default async function middleware(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ['/profile', '/posts/create'] };
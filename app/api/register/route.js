import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(req) { 
    try {
        const { userName, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToMongoDB();
        await User.create({ userName, password: hashedPassword });

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error registering user" }, { status: 500 });
    }
}
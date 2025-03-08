import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
	try {
		await connectToMongoDB();
		const { userName } = await req.json();
		const user = await User.findOne({ userName }).select("_id");
		console.log("User", user);

		return NextResponse.json({ user });
	} catch (error) {
		console.log("Error", error);
	}
}

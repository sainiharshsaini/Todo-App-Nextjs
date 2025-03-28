import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import connectDB from "@/lib/config/connectDB";
import User from "@/lib/models/UserModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await connectDB();

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created" });
    }
}

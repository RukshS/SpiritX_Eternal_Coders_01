"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="grid place-items-center h-screen bg-gradient-to-r from-fuchsia-600 to-indigo-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="shadow-2xl p-10 bg-white/90 rounded-lg backdrop-blur-sm w-full max-w-2xl"
            >
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to <span className="text-fuchsia-600">SecureConnect</span>
                </h1>
                <div className="flex flex-col gap-6">
                    <Link href="/login">
                        <button
                            className="bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-lg w-full
                                       hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105
                                       focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button
                            className="bg-white text-fuchsia-600 font-bold py-3 px-6 rounded-lg w-full
                                       border-2 border-fuchsia-600 hover:bg-fuchsia-50 transition-all duration-300
                                       transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                                       focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>
                <p className="text-center text-gray-600 mt-8">
                    Secure your connections with ease.
                </p>
            </motion.div>
        </div>
    );
}
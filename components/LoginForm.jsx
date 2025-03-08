// components/LoginForm.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ userName: "", password: "", form: "" });
    const [userNameTouched, setUserNameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        validateUserName(userName);
        validatePassword(password);
    }, [userName, password]);

    const validateUserName = (userName) => {
        if (userName.length < 8 && userName.length > 0) {
            setError((prev) => ({ ...prev, userName: "Username must be at least 8 characters long" }));
        } else {
            setError((prev) => ({ ...prev, userName: "" }));
        }
    };

    const validatePassword = (password) => {
        if (password.length < 8 && password.length > 0) {
            setError((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
        } else {
            setError((prev) => ({ ...prev, password: "" }));
        }
    };

    const shouldShowError = (field, touched) => {
        return touched && field !== "" && error[field];
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setUserNameTouched(true);
        setPasswordTouched(true);

        // Check for empty fields
        if (!userName || !password) {
            setError((prev) => ({ ...prev, form: "All fields are required" }));
            return;
        }

        // Check for validation errors
        if (error.userName || error.password) {
            setError((prev) => ({ ...prev, form: "Please fix validation errors" }));
            return;
        }

        try {
            const result = await signIn("credentials", {
                userName,
                password,
                redirect: false,
            });

            if (result.error) {
                setError((prev) => ({ ...prev, form: "Invalid username or password" }));
                return;
            }

            router.replace("/dashboard");
        } catch (error) {
            console.log("Error: ", error);
            setError((prev) => ({ ...prev, form: "Login failed: " + error.message }));
        }
    };

    return (
        <div className="grid place-items-center h-screen bg-gradient-to-r from-fuchsia-600 to-indigo-600">
            <div className="shadow-2xl p-10 bg-white/90 rounded-lg backdrop-blur-sm w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Welcome to <span className="text-fuchsia-600">SecureConnect</span>
                </h1>
                <form onSubmit={handleSubmission} className="flex flex-col gap-6 items-center">
                    <div className="w-full">
                        <input
                            type="text"
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setUserNameTouched(true);
                            }}
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                        {shouldShowError("userName", userNameTouched) && (
                            <div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                                {error.userName}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordTouched(true);
                            }}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                        {shouldShowError("password", passwordTouched) && (
                            <div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                                {error.password}
                            </div>
                        )}
                    </div>

                    {submitted && error.form && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            {error.form}
                        </div>
                    )}

                    <button
                        className="bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-lg w-full
                                   hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105
                                   focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                    >
                        Login
                    </button>

                    <Link className="text-sm text-center text-gray-600 mt-4" href="/register">
                        Don't have an account?{" "}
                        <span className="text-fuchsia-600 underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
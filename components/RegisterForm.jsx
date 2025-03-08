"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState({ userName: "", password: "", confirmationPassword: "" });
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [userNameTouched, setUserNameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmationPasswordTouched, setConfirmationPasswordTouched] = useState(false);

    const router = useRouter();

    useEffect(() => {
        validateUserName(userName);
        validatePassword(password);
        validateConfirmationPassword(confirmationPassword);
    }, [userName, password, confirmationPassword]);

    const validateUserName = (userName) => {
        if (userName.length < 8) {
            setError((prev) => ({ ...prev, userName: "Username must be at least 8 characters long" }));
        } else {
            setError((prev) => ({ ...prev, userName: "" }));
        }
    };

    const validatePassword = (password) => {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasLowerCase || !hasUpperCase || !hasSpecialChar) {
            setError((prev) => ({ ...prev, password: "Password must contain at least one lowercase letter, one uppercase letter, and one special character" }));
        } else {
            setError((prev) => ({ ...prev, password: "" }));
        }

        if (password.length < 8) {
            setPasswordStrength("Weak");
        } else if (password.length < 12) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const validateConfirmationPassword = (confirmationPassword) => {
        if (confirmationPassword !== password) {
            setError((prev) => ({ ...prev, confirmationPassword: "Passwords do not match" }));
        } else {
            setError((prev) => ({ ...prev, confirmationPassword: "" }));
        }
    };

    const handleSubmission = async (e) => {
			e.preventDefault();
			setSubmitted(true);
			setUserNameTouched(true);
			setPasswordTouched(true);
			setConfirmationPasswordTouched(true);

			// Check for empty fields
			if (!userName || !password || !confirmationPassword) {
				setError((prev) => ({ ...prev, form: "All fields are required" }));
				return;
    }
        
			if (error.userName || error.password || error.confirmationPassword) {
				return;
			}

			try {
				const resultExists = await fetch("/api/userExists", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userName }),
				});

				const { user } = await resultExists.json();

				if (user) {
					setError((prev) => ({ ...prev, userName: "User already exists" }));
					return;
				}

				const result = await fetch("/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userName, password }),
				});

				if (result.ok) {
					const form = e.target;
					form.reset();
					setError({ userName: "", password: "", confirmationPassword: "" });
					setSuccess(true);
					setTimeout(() => {
						router.push("/");
					}, 2000);
				} else {
					const data = await result.json();
					setError((prev) => ({
						...prev,
						form: data.message || "Error registering user",
					}));
				}
			} catch (error) {
				setError((prev) => ({
					...prev,
					form: "Error during registration: " + error.message,
				}));
			}
		};

    const shouldShowError = (field, touched) => {
        return touched && field !== "" && error[field];
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 bg-white rounded-lg border-t-8 border-fuchsia-500">
                <h1 className="text-xl font-bold my-4">Register with SecureConnect</h1>

                <form
                    onSubmit={handleSubmission}
                    className="flex flex-col gap-3 space-y-4"
                >
                    <input
                        type="text"
                        onChange={(e) => {
                            setUserName(e.target.value);
                            setUserNameTouched(true);
                        }}
                        placeholder="Username"
                    />
                    {shouldShowError('userName', userNameTouched) && (
                        <div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            {error.userName}
                        </div>
                    )}
                    <input
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordTouched(true);
                        }}
                        placeholder="Password"
                    />
                    {passwordTouched && password !== "" && (
                        <div className={`text-sm font-bold transform transition-all duration-300 ease-in-out ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                            Password strength: {passwordStrength}
                        </div>
                    )}
                    {shouldShowError('password', passwordTouched) && (
                        <div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            {error.password}
                        </div>
                    )}
                    <input
                        type="password"
                        onChange={(e) => {
                            setConfirmationPassword(e.target.value);
                            setConfirmationPasswordTouched(true);
                        }}
                        placeholder="Confirm Password"
                    />
                    {shouldShowError('confirmationPassword', confirmationPasswordTouched) && (
                        <div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            {error.confirmationPassword}
                        </div>
                    )}

                    {submitted && error.form && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            {error.form}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
                            Registration successful! Redirecting to login page...
                        </div>
                    )}

                    <button className="bg-fuchsia-600 text-white font-bold cursor-pointer py-2 px-4">
                        Sign Up
                    </button>

                    <Link className="text-sm mt-3 text-right" href={"/"}>
                        Have an account already? <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

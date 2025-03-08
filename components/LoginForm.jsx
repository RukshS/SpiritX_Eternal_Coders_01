"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ userName: "", password: "", form: "" });
    const [userNameTouched, setUserNameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

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

        // Password strength indicator
        if (password.length < 8) {
            setPasswordStrength("Weak");
        } else if (password.length < 12) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
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
            setError(prev => ({...prev, form: "All fields are required"}));
            return;
        }

        // Check for validation errors
        if (error.userName || error.password) {
            setError(prev => ({...prev, form: "Please fix validation errors"}));
            return;
        }

        try {
            const result = await signIn("credentials", {
                userName,
                password,
                redirect: false
            });

            if (result.error) {
                setError(prev => ({...prev, form: "Invalid username or password"}));
                return;
            }

            router.replace("/dashboard");
        } catch (error) {
            console.log("Error: ", error);
            setError(prev => ({...prev, form: "Login failed: " + error.message}));
        }
    }

  return (
		<div className="grid place-items-center h-screen">
			<div className="shadow-lg p-5 bg-white rounded-lg border-t-8 border-fuchsia-500">
				<h1 className="text-xl font-bold my-4">Welcome to SecureConnect</h1>

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
					{shouldShowError("userName", userNameTouched) && (
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
						<div
							className={`text-sm font-bold transform transition-all duration-300 ease-in-out ${
								passwordStrength === "Weak"
									? "text-red-500"
									: passwordStrength === "Medium"
									? "text-yellow-500"
									: "text-green-500"
							}`}
						>
							Password strength: {passwordStrength}
						</div>
					)}
					{shouldShowError("password", passwordTouched) && (
						<div className="text-red-500 text-sm transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
							{error.password}
						</div>
					)}

					{submitted && error.form && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative transform transition-all duration-300 ease-in-out origin-top animate-slideDown">
							{error.form}
						</div>
                  )}
                  
					<button className="bg-fuchsia-600 text-white font-bold cursor-pointer py-2 px-4">
						Login
					</button>

					<Link className="text-sm mt-3 text-right" href={"/register"}>
						Don't have an account already?{" "}
						<span className="underline">Register</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
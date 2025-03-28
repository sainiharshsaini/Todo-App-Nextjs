"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleAuth = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (res?.error) {
            alert("Invalid credentials");
        } else {
            router.push("/todos");
        }
    };

    const handleSignup = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            alert("User registered! You can login now.");
            setIsLogin(true);
        } else {
            alert("Signup failed");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">{isLogin ? "Login" : "Signup"}</h1>
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
            )}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={isLogin ? handleAuth : handleSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {isLogin ? "Login" : "Signup"}
            </button>
        </div>
    );
};

export default AuthForm;

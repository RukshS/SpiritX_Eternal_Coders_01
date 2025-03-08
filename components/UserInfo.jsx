"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserInfo() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    if (status === "loading") {
        return (
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-4">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-4">
                <div>
                    Hello, <span className="font-bold">{session?.user?.name || "User"}</span>!
                </div>

                <button 
                    onClick={handleSignOut}
                    className="bg-red-600 text-white font-bold cursor-pointer py-2 px-4 mt-3">
                    Log Out
                </button>
            </div>
        </div>
    );
}

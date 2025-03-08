"use client";

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="grid place-items-center h-screen">Loading...</div>;
    }

    return <UserInfo />;
}
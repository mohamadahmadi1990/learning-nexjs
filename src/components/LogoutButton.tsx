"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // Redirect after logout
                },
            },
        });
    };

    return (
        <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
        >
            Sign Out
        </button>
    );
}
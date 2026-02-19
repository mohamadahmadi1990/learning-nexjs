import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // Securely validate the session against the database
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Final security gate
    if (!session) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="mt-6 p-4 bg-white border rounded shadow-sm">
                <p className="text-gray-600">Logged in as:</p>
                <p className="font-mono font-bold text-blue-600">{user.email}</p>
                <p className="mt-2 text-sm text-gray-400">User ID: {user.id}</p>
            </div>
            <LogoutButton />
            {/* Example of a Mongoose call for user-specific data */}
            {/* const myData = await MyMongooseModel.find({ userId: user.id }); */}
        </div>
    );
}
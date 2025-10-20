import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/sign-in");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Selamat datang, {session.user?.name}! 
      </h1>
      <p className="text-gray-600">Email: {session.user?.email}</p>
    </div>
  );
}

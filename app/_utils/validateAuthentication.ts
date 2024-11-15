import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function validateAuthentication() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
}

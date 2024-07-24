// src/app/ClientComponent.tsx or src/app/ClientComponent.js
"use client"; // Mark this component as a client component

import { redirect } from "next/navigation";

import { useSession } from "next-auth/react"; // or any other client-side hooks

export default function RedirectComponent() {
  const { data: session } = useSession(); // Use client-side hooks here

  if (!session) {
    redirect("/login");
  }

  return <></>;
}

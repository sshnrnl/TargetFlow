// app/components/LogoutButton.tsx
"use client"; // Make sure this is client-side code

import { useRouter } from "next/navigation"; // Import from 'next/navigation' instead of 'next/router'

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout");

    if (res.ok) {
      router.push("/login"); // You can change this to your desired path
    } else {
      alert("Logout failed!");
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;

// app/components/Profile.tsx
"use client";

import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();



  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
      <p>Role: {session.user?.role}</p>
    </div>
  );
};

export default Profile;

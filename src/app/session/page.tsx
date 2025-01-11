// app/session-check/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SessionChecker = async () => {
  // Fetch session data server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <button onClick={() => (window.location.href = "/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => (window.location.href = "/")}>Go to Home</button>
    </div>
  );
};

export default SessionChecker;

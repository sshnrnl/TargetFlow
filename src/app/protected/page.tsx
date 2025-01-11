// app/protected/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"; // Import authOptions

const ProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>You are not logged in. Please log in to access this page.</p>
        <button onClick={() => (window.location.href = "/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome to the protected page, {session.user?.name}!</p>
    </div>
  );
};

export default ProtectedPage;

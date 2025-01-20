import { jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export async function verifyJwt(token: string) {
  const secretKey = new TextEncoder().encode(SECRET_KEY); // Ensure this is the same secret key used in Flask
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"], // Specify the algorithm to be used for verification
    });
    return payload; // Return decoded payload
  } catch (err) {
    throw new Error("JWT validation failed");
  }
}

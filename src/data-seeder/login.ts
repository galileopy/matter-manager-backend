import { BASE_URL } from "./constants";

export async function login(): Promise<string> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    body: JSON.stringify({ username: "admin" }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.headers.get("x-access-token");

  if (!data || typeof data !== "string") {
    throw new Error("No token found in response headers");
  }

  return data;
}

import { BASE_URL } from "./constants";

export async function createClient(options: {
  name: string;
  suffix: string;
  type: string;
  token: string;
}) {
  const { name, suffix, type, token } = options;
  return await fetch(`${BASE_URL}/api/clients`, {
    headers: {
      accept: "application/json, text/plain, */*",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, suffix, type }),
    method: "POST",
  });
}

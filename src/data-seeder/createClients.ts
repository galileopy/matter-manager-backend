import { login } from "./login";
import { createClient } from "./createClient";

export async function createClients(options: {
  amount: number;
  token: string
}) {
  const { amount, token } = options;
  const operations = new Array(amount)
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      const client = await createClient({
        name: `Client ${i.toString().padStart(3, "0")}`,
        suffix: `Suffix ${i.toString().padStart(3, "0")}`,
        type: "ASSOCIATION",
        token,
      });
      const data = await client.json();
      console.log(data);
      return data;
    });
  return await Promise.all(operations);
}

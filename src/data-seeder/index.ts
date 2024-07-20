import { createClients } from './createClients';
import { login } from './login';

async function seedClients() {
  const token = await login();
  await createClients({
    token,
    amount: 100,
  });
}

seedClients();

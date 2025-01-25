import { BASE_URL } from "@/helpers/api";

export async function fetchPayments() {
  const res = await fetch(`${BASE_URL}/payments`);
  return res.json();
}

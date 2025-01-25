import { fetchPayments } from "@/api/payments";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Payment } from "./Payment";
import { QUERIES } from "@/helpers/queries";

export default async function Payments() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERIES.fetchPayments],
    queryFn: fetchPayments,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Payments goes here
      <Payment dehydratedState={dehydratedState} />
    </div>
  );
}

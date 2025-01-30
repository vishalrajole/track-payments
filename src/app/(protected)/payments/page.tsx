import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PaymentList } from "./PaymentList";

export default async function Payments() {
  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Payments
      <HydrationBoundary state={dehydratedState}>
        <PaymentList />
      </HydrationBoundary>
    </div>
  );
}

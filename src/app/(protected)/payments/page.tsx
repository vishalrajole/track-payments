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
    <div className="grid items-center justify-items-center">
      <HydrationBoundary state={dehydratedState}>
        <PaymentList />
      </HydrationBoundary>
    </div>
  );
}

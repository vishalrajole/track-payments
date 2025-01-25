"use client";

import { useQuery } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { QUERIES } from "@/helpers/queries";
import { fetchPayments } from "@/api/payments";

export function Payment({ dehydratedState }: { dehydratedState: any }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <PaymentList />
    </HydrationBoundary>
  );
}

function PaymentList() {
  const { data: PaymentList, isLoading } = useQuery({
    queryKey: [QUERIES.fetchPayments],
    queryFn: fetchPayments,
  });

  if (isLoading) return <div>fetching payments...</div>;

  return (
    <div>
      <pre>{JSON.stringify(PaymentList, null, 2)}</pre>
    </div>
  );
}

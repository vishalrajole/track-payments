import { faker } from "@faker-js/faker";
import { ColumnSort, SortingState } from "@tanstack/react-table";

export type PaymentStatus = "completed" | "failed" | "processing";
export type Payment = {
  id: number;
  firstName: string;
  lastName: string;
  reference: string;
  amount: string;
  status: PaymentStatus;
  createdAt: Date;
};

export type paymentApiResponse = {
  data: Payment[];
  meta: {
    totalRowCount: number;
  };
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newpayment = (index: number): Payment => {
  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    reference: faker.lorem.word(),
    amount: faker.finance.amount(),
    createdAt: faker.date.anytime(),
    status: faker.helpers.shuffle<Payment["status"]>([
      "completed",
      "failed",
      "processing",
    ])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Payment[] => {
    const len = lens[depth]!;
    return range(len).map((d): Payment => {
      return {
        ...newpayment(d),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(1000);

//simulates a backend api
export const fetchData = async ({
  start,
  limit,
  sorting,
  searchTerm,
}: {
  start: number;
  limit: number;
  sorting: SortingState;
  searchTerm?: string;
}) => {
  let dbData = [...data];
  if (sorting?.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof Payment; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  if (searchTerm?.length) {
    dbData = dbData.filter((payment) =>
      Object.values(payment).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  //simulate a backend api
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    data: dbData.slice(start, start + limit),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};

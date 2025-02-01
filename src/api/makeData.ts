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

export type Notification = {
  id: number;
  title: string;
  message: string;
  createdAt: Date;
};

export type PaymentResponse = {
  data: Payment[];
  meta: {
    totalRowCount: number;
  };
};

export type NotificationResponse = {
  data: Notification[];
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

const newPayment = (index: number): Payment => {
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

const newNotification = (index: number): Notification => {
  return {
    id: index + 1,
    title: faker.lorem.words(),
    message: faker.lorem.sentence(),
    createdAt: faker.date.anytime(),
  };
};

export function makeData<T extends "payment" | "notification">(
  model: T,
  ...lens: number[]
): T extends "payment" ? Payment[] : Notification[] {
  const makeDataLevel = (depth = 0): (Payment | Notification)[] => {
    const len = lens[depth]!;
    return range(len).map((d): Payment | Notification => {
      return model === "payment"
        ? { ...newPayment(d) }
        : { ...newNotification(d) };
    });
  };

  return makeDataLevel() as T extends "payment" ? Payment[] : Notification[];
}

const paymentData = makeData("payment", 1000);

//simulates a backend api
export const fetchPaymentsData = async ({
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
  let dbData = [...paymentData];
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

const notificationsData = makeData("notification", 1000);

//simulates a backend api
export const fetchNotificationsData = async ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}) => {
  let dbData = [...notificationsData];

  //simulate a backend api
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    data: dbData.slice(start, start + limit),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};

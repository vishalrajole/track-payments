Track payments for real estate for properties.

- [x] display list of payments: searching, sorting, infinite scroll pagination 
- [x] display notifications: infinite scroll, 
- [x] authenticated routes 
- [x] login/logout screen with react19 actions (demo purpose)
- [x] cypress e2e 
- [x] nest js backend api to fetch payments and notifications with pagination, search, sort functionality
- [ ] Database setup 
- [ ] CI deployment for nextjs app and nest js backend: broken on vercel


## Tech stack
- client: Next js 15 (app router), tailwind css, tanstack query, tanstack table, shadcn ui, cypress.io 
- backend: Nest js, faker.js

## Getting Started

- inside `src` folder run `yarn` and `yarn dev` to run client locally on localhost:3000
- inside `src/backend` folder run `yarn` and `yarn start` to run backend api server on localhost:3001

## Deployed on Vercel

- client is deployed on Vercel [https://track-payments-eta.vercel.app/]

# env

Create `.env` file at the root of the project with following keys

```bash
SESSION_SECRET=""
```

## Screenshots

<img width="1512" alt="Screenshot 2025-02-01 at 9 39 38 PM" src="https://github.com/user-attachments/assets/952f2867-d2e9-4db5-9c15-b31aabfe1a90" />

<img width="1512" alt="Screenshot 2025-02-01 at 9 39 47 PM" src="https://github.com/user-attachments/assets/cdb6f162-a07d-4cb2-a694-e8c99fa91d8a" />

<img width="1512" alt="Screenshot 2025-02-01 at 9 40 04 PM" src="https://github.com/user-attachments/assets/3bed870c-0fd4-4147-870a-77c1b43b4705" />

<img width="1512" alt="Screenshot 2025-02-01 at 9 40 14 PM" src="https://github.com/user-attachments/assets/6fa72b20-4582-4013-9c23-af296536bd35" />

<img width="1512" alt="Screenshot 2025-02-01 at 9 40 28 PM" src="https://github.com/user-attachments/assets/e32e9edd-31f8-4c59-aa1a-292630007f96" />

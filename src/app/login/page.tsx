"use client";
import React, { useReducer, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const initialState = {
  username: "",
  password: "",
  error: "",
};

function reducer(
  state: typeof initialState,
  action: { type: string; payload?: string }
) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload || "" };
    case "SET_PASSWORD":
      return { ...state, password: action.payload || "" };
    case "SET_ERROR":
      return { ...state, error: action.payload || "" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password } = state;

    if (username === "username" && password === "password") {
      startTransition(() => {
        router.push("/payments");
      });
    } else {
      dispatch({ type: "SET_ERROR", payload: "Invalid username or password" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              variant="default"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

"use client";

import { authenticate, googleAuthenticate } from "@/lib/actions";
import { lusitana } from "@/app/ui/standalone/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
      <h1
        className={`${lusitana.className} text-2xl font-bold text-center text-gray-800`}
      >
        Please log in to continue
      </h1>
      <form action={googleAuthenticate} className="mt-4">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Sign in with Google
        </button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <div className="w-full border-t border-gray-300"></div>
        <span className="absolute bg-white px-4 text-gray-500">or</span>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-4">
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button
            className="mt-8 w-full #0284c7 text-white hover:bg-blue-600 transition duration-300"
            aria-disabled={isPending}
          >
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
          </Button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

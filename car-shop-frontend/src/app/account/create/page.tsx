"use client";

import { CreateUser } from "@/app/actions/userActions";
import Link from "next/link";
import { useActionState } from "react";
import { Button, Form, Input, Label } from "react-aria-components";


export default function Page() {
    const [state, action, isPending] = useActionState(CreateUser, undefined)
    return (
        <div className="grow bg-zinc-50">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Carketplace Logo"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-800">Create Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form className="space-y-6"
                        action={action}>
                        <div>
                            <Label htmlFor="username" className="block text-sm/6 font-medium text-gray-800">
                                Username
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-800">
                                    Password
                                </Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-800">
                                    Confirm Password
                                </Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="text-red-400 text-sm">
                            {state?.message ?? (
                                <p>{state?.message}</p>
                            )}
                        </div>

                        <div>
                            <Button
                                type="submit"
                                isDisabled={isPending}
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-zinc-50 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {isPending ? "Creating account" : "Create account"}
                            </Button>
                        </div>
                    </Form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <Link href="/account/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

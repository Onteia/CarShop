"use server";

import { API_URI } from "@/config";
import { AppUserModel } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { encrypt } from "../lib/session";
import { getUser } from "../lib/dal";

//export async function CreateUser() {

//}

export async function LoginUser(_: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
        data: undefined,
    };

    const data = await fetch(`${API_URI!}/users/login`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (data.status === 404) return {
        success: false,
        message: "User with given email does not exist",
        data: undefined,
    };
    if (data.status === 401) return {
        success: false,
        message: "Incorrect password",
        data: undefined,
    };

    const user = (await data.json() as AppUserModel);
    const cookie = await cookies();
    cookie.set("session", await encrypt({ userID: user.userID }));
    redirect("/")
}

export async function LogOutUser() {
    const cookie = await cookies();
    if (cookie.get("session") === undefined) return;

    cookie.delete("session");
    redirect("/");
}

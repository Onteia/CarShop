import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userID) return { isAuth: false, userID: undefined };

    return { isAuth: true, userID: session.userID };
});

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    const response = await fetch(`http://localhost:5011/users/${session.userID}`);
    if (!response.ok) return null;

    return await response.json();
});

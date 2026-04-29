"use server";

import { redirect } from "next/navigation";
import { getUser, verifySession } from "../lib/dal";
import { API_URI } from "@/config";

export async function addListingToWishlist(_: { success: boolean, message: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    }

    const listingID = formData.get("listingId") as string;
    const data = await fetch(`${API_URI}/wishlists/${user.wishlistID}/listings`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingID),
    });

    if (data.status === 404) return {
        success: false,
        message: `Wishlist ${user.wishlistID} or listing ${listingID} cannot be found`,
    }

    return { success: true, message: "Added to your wishlist" };
}

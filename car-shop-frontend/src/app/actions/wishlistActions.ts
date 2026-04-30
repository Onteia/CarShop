"use server";

import { redirect } from "next/navigation";
import { getUser, verifySession } from "../lib/dal";
import { API_URI } from "@/config";
import { cache } from "react";
import { getListing } from "./listingActions";

export const getWishlistListings = cache(async () => {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return undefined;

    const data = await fetch(`${API_URI}/wishlists/${user.wishlistID}/listings`, {
        method: "GET",
        mode: "cors",
    });

    if (data.status === 404) return undefined;

    const wishlistListingIDs: string[] = (await data.json())?.listings;
    const wishlistListings = wishlistListingIDs.map(async (listingID) => {
        return getListing(listingID);
    });

    return await Promise.all(wishlistListings);
});

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

export async function removeListingFromWishlist(_: { success: boolean, message: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    }

    const listingID = formData.get("listingId") as string;
    const data = await fetch(`${API_URI}/wishlists/${user.wishlistID}/listings`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingID),
    });

    if (data.status === 404) return {
        success: false,
        message: `Wishlist ${user.wishlistID} or ${listingID} cannot be found`,
    }

    return { success: true, message: "Removed from your wishlist", };
}

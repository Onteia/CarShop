"use server";

import { redirect } from "next/navigation";
import { getUser } from "../lib/dal";
import { API_URI } from "@/config";
import { ListingModel } from "@/types";
import { getListing } from "./listingActions";
import { cache } from "react";

export const getUserCartListings = cache(async () => {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return undefined;

    const data = await fetch(`${API_URI}/carts/${user.cartID}/listings`, {
        method: "GET",
        mode: "cors",
    });

    if (data.status === 404) return undefined;

    const cartListingIDs: string[] = (await data.json())?.listings;
    const carListings = cartListingIDs.map(async (listingID) => {
        return getListing(listingID);
    });

    return await Promise.all(carListings);
});

export async function addListingToCart(_: { success: boolean, message: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    };

    const listingID = formData.get("listingId") as string;
    const data = await fetch(`${API_URI}/carts/${user.cartID}/listings`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingID),
    });

    if (data.status === 404) return {
        success: false,
        message: `Cart ${user.cartID} or listing ${listingID} cannot be found`,
    }

    return { success: true, message: "Added to your cart" };
}

export async function removeListingFromCart(_: { success: boolean, message: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    };

    const listingID = formData.get("listingId") as string;
    const data = await fetch(`${API_URI}/carts/${user.cartID}/listings`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingID),
    });

    if (data.status === 404) return {
        success: false,
        message: `Cart ${user.cartID} or listing ${listingID} cannot be found`,
    };

    return { success: true, message: "Removed from your cart" };
}


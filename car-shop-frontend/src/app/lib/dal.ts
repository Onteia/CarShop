import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { AppUserModel, ListingModel } from "@/types";

const API_URI = process.env.API_URI;

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userID) return { isAuth: false, userID: undefined };

    return { isAuth: true, userID: session.userID };
});

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    const response = await fetch(`${API_URI}/users/${session.userID}`, { mode: "cors" });
    if (!response.ok) return null;

    return await response.json() as AppUserModel;
});

export const getUserCartListings = cache(async () => {
    const user = await getUser();
    if (user === null) return null;

    const response = await fetch(`${API_URI}/carts/${user.cartID}/listings`, { mode: "cors" });
    if (!response.ok) return null;

    const cartListingIDs: string[] = (await response.json())?.listings;
    const cartListings = cartListingIDs.map(async (listingID) => {
        return getListing(listingID);
    });

    return await Promise.all(cartListings);
});

export const getWishlistListings = cache(async () => {
    const user = await getUser();
    if (user === null) return null;

    const response = await fetch(`${API_URI}/wishlists/${user.wishlistID}/listings`, { mode: "cors" })
    if (!response.ok) return null;

    const wishlistListingIDs: string[] = (await response.json())?.listings;
    const wishlistListings = wishlistListingIDs.map(async (listingID) => {
        return getListing(listingID);
    });

    return await Promise.all(wishlistListings);
});

export const getListing = cache(async (listingID: string) => {
    const response = await fetch(`${API_URI}/listings/${listingID}`);
    const listing: ListingModel = (await response.json());
    return listing;
});

export const getListings = cache(async () => {
    const response = await fetch(`${API_URI}/listings`, { mode: "cors" });
    const listings: ListingModel[] = (await response.json())?.listings;

    return listings;
});

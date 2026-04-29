"use server";

import { API_URI } from "@/config";
import { ListingModel } from "@/types";
import { cache } from "react";

export const getListing = cache(async (listingID: string) => {
    const response = await fetch(`${API_URI}/listings/${listingID}`);
    const listing: ListingModel = (await response.json());
    return listing;
});

export const getListings = cache(async () => {
    const response = await fetch(`${API_URI}/listings`, { mode: "cors" });
    const listings: ListingModel[] = (await response.json());

    return listings;
});

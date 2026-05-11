"use server";

import { API_URI } from "@/config";
import { ListingModel } from "@/types";
import { cache } from "react";
import { getUser } from "../lib/dal";
import { redirect } from "next/navigation";
import { createVehicle } from "./vehicleActions";

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

export async function createListing(_: { success: boolean, message: string, data?: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    };

    const name = formData.get("listingName") as string;
    const listPrice = formData.get("listPrice") as string;
    const saleAmount = formData.get("saleAmount") as string;
    const vehicle = await createVehicle(_, formData);

    console.log("vehicle: ", vehicle.data);
    if (!vehicle.success) return {
        success: vehicle.success,
        message: vehicle.message,
        data: vehicle.data,
    };

    const payload = JSON.stringify({
        Name: name,
        ListPrice: listPrice,
        SaleAmount: saleAmount,
        VehicleModelID: vehicle.data
    });

    console.log("payload: ", payload);

    const data = await fetch(`${API_URI}/listings`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Name: name,
            ListPrice: listPrice,
            SaleAmount: (saleAmount === "") ? 0 : saleAmount,
            VehicleModelID: vehicle.data,
        }),
    });

    if (!data.ok) return {
        success: false,
        message: data.statusText,
    }

    if (data.status === 404) return {
        success: false,
        message: `Vehicle ${vehicle.data} doesn't exist`,
    };

    const listingID = (await data.json()).listingID;

    return {
        success: true,
        message: "Successfully listed your vehicle!",
        data: listingID,
    };
}

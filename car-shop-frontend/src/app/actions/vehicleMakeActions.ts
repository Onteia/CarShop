"use server";

import { API_URI } from "@/config";
import { VehicleMakeModel } from "@/types";
import { cache } from "react";


export const getVehicleMakes = cache(async () => {
    const response = await fetch(`${API_URI}/vehicleMakes`, {
        method: "GET",
        mode: "cors",
    });

    const makes: VehicleMakeModel[] = (await response.json()).makes;
    return makes;
});

"use server";

import { API_URI } from "@/config";
import { VehicleTypeModel } from "@/types";
import { cache } from "react";

export const getVehicleTypes = cache(async () => {
    const response = await fetch(`${API_URI}/vehicleTypes`, {
        method: "GET",
        mode: "cors",
    });

    const types: VehicleTypeModel[] = (await response.json()).types;
    return types;
});

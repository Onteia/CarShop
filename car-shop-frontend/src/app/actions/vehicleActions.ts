import { redirect } from "next/navigation";
import { getUser } from "../lib/dal";
import { API_URI } from "@/config";
import { createImageModel, uploadImage } from "./imageActions";


export async function createVehicle(_: { success: boolean, message: string }, formData: FormData) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    };

    const modelName = formData.get("modelName") as string;
    const vehicleYear = parseInt(formData.get("vehicleYear") as string);
    const isUsed = formData.get("isUsed") === "on";
    const vehicleType = formData.get("typeId") as string;
    const vehicleMake = formData.get("makeId") as string;
    const images = formData.getAll("images") as File[];

    if (images.length === 0 || images === undefined) return {
        success: false,
        message: "Must include at least one image",
    };

    const imageStatuses = (await Promise.all(images.map(uploadImage)));
    if (imageStatuses.some(i => !i.success)) return {
        success: false,
        message: "One or more images failed to upload",
    };

    const imageIds: string[] = imageStatuses.map(i => i.data!);

    const data = await fetch(`${API_URI}/vehicles`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Model: modelName,
            Year: vehicleYear,
            IsUsed: isUsed,
            VehicleTypeID: vehicleType,
            VehicleMakeID: vehicleMake,
            ImageIDs: imageIds
        }),
    });

    if (!data.ok) return {
        success: false,
        message: data.statusText,
    }

    if (data.status === 404) return {
        success: false,
        message: `Type ${vehicleType}, Make ${vehicleMake}, or images don't exist`,
    };

    const vehicleID = (await data.json())?.vehicleID;

    return {
        success: true,
        message: "",
        data: vehicleID,
    };
}

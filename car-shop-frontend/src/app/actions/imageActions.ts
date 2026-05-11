import { API_URI } from "@/config";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/dal";
import path from "path";
import { writeFile } from "fs";

export async function uploadImage(image: File) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = image.name.split(".").pop();
    const filename = `${crypto.randomUUID()}.${ext}`;
    const filepath = path.join(process.cwd(), "public", "media", filename);

    writeFile(filepath, buffer, (err) => {
        if (err) return {
            success: false,
            message: err.message,
        };
    });

    return createImageModel(`/media/${filename}`);
}

export async function createImageModel(imageUri: string) {
    const user = await getUser();
    if (user === null) redirect("/account/login");
    if (API_URI === undefined) return {
        success: false,
        message: "Couldn't access API",
    };

    const data = await fetch(`${API_URI}/images`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageURI: imageUri }),
    });

    if (!data.ok) return {
        success: false,
        message: "File must be an image",
    }

    const imageId: string = (await data.json())?.imageID;

    return {
        success: true,
        message: "",
        data: imageId,
    }
}

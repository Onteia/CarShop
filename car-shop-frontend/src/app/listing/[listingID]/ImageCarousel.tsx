"use client";

import { ImageModel } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Button } from "react-aria-components";


export default function ImageCarousel({ listingImages }: { listingImages: ImageModel[] }) {
    const [thumbIndex, setThumbIndex] = useState<number>(0);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);

    return (<div onMouseEnter={() => {
        if (listingImages.length <= 1) return;
        prevRef.current!.hidden = false;
        nextRef.current!.hidden = false;
        indexRef.current!.hidden = false;
    }} onMouseLeave={() => {
        if (listingImages.length <= 1) return;
        prevRef.current!.hidden = true;
        nextRef.current!.hidden = true;
        indexRef.current!.hidden = true;
    }} className="flex flex-row justify-between lg:items-end items-start rounded-md outline-1 mx-6 lg:mx-0 lg:min-h-[50dvh] min-h-[100dvh] min-w-[50dvw] overflow-hidden" style={{ backgroundImage: `url(${listingImages[thumbIndex].imageURI})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
        {(listingImages.length > 1) && <>
            <Button ref={prevRef} type="button" hidden onPress={() => setThumbIndex(((thumbIndex + listingImages.length) - 1) % (listingImages.length))} className="hover:cursor-pointer h-full bg-gray-800/40 p-2 z-1">
                <ChevronLeftIcon className={"w-8 h-full"} />
            </Button>
            <div ref={indexRef} hidden className="align-bottom">
                <p className="bg-gray-800 px-2 py-1 rounded-md"><b>{thumbIndex + 1}/{listingImages.length}</b></p>
            </div>
            <Button ref={nextRef} type="button" hidden onPress={() => setThumbIndex((thumbIndex + 1) % (listingImages.length))} className="hover:cursor-pointer h-full bg-gray-800/40 p-2 z-1">
                <ChevronRightIcon className={"w-8 h-full"} />
            </Button>
        </>
        }
    </div >
    );
}

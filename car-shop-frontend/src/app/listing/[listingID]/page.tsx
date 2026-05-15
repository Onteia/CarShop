"use client";

import { ListingModel } from "@/types";
import { useRouter } from "next/navigation";
import { use, useActionState, useEffect, useState } from "react";
import { formatPrice, getListingPrice } from "@/app/utils/listingUtils";
import { Button, Form } from "react-aria-components";
import { addListingToCart } from "@/app/actions/cartActions";
import { addListingToWishlist } from "@/app/actions/wishlistActions";
import { toast } from "react-toastify";
import { getListing } from "@/app/actions/listingActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageCarousel from "./ImageCarousel";
import Link from "next/link";

export default function Page({ params }: { params: Promise<{ listingID: string }> }) {
    const { listingID } = use(params);
    const [listing, setListing] = useState<ListingModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [cartState, cartAction, cartPending] = useActionState(addListingToCart, { success: false, message: "" });
    const [wishlistState, wishlistAction, wishlistPending] = useActionState(addListingToWishlist, { success: false, message: "" });

    useEffect(() => {
        if (listingID === "") return;
        getListing(listingID).then((result) => {
            setListing(result);
            setLoading(false);
        });
    }, [listingID]);

    useEffect(() => {
        if (cartState.message === "") return;
        toast(cartState.message, {
            type: (cartState.success) ? "success" : "error",
        });
    }, [cartState]);

    useEffect(() => {
        if (wishlistState.message === "") return;
        toast(wishlistState.message, {
            type: (wishlistState.success) ? "success" : "error",
        })
    }, [wishlistState]);

    return (
        <div className="grow bg-zinc-50">
            <div className="py-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                {loading ? <Skeleton containerClassName="flex-1 w-24" /> :
                                    <Link href={`/shop?vehicleTypeID=${listing?.vehicle.vehicleType.vehicleTypeID}`} className="mr-2 text-sm font-medium text-gray-900">{listing?.vehicle.vehicleType.typeName}</Link>
                                }
                                <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                {loading ? <Skeleton containerClassName="flex-1 w-18" /> :
                                    <Link href={`/shop?vehicleMakeID=${listing?.vehicle.vehicleMake.vehicleMakeID}`} className="mr-2 text-sm font-medium text-gray-900">{listing?.vehicle.vehicleMake.makeName}</Link>
                                }
                                <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li className="text-sm">
                            {loading ? <Skeleton containerClassName="w-24" /> :
                                <Link href={`/shop?modelName=${listing?.vehicle.model}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{listing?.vehicle.model}</Link>
                            }
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto max-w-2xl px-4 pt-10 pb-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {loading ? <Skeleton className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl" /> : <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{listing?.name} {listing?.vehicle.isUsed && <u>(USED)</u>}</h1>}
                    </div>

                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Vehicle information</h2>
                        {loading ? <Skeleton className="text-3xl tracking-tight text-gray-900" /> :
                            <p className="text-3xl tracking-tight text-gray-900">{(formatPrice(getListingPrice(listing)))}
                                {(listing?.listPrice !== getListingPrice(listing)) && <span style={{ whiteSpace: "pre", fontSize: 12, verticalAlign: "center" }}>    List: <s>{formatPrice(listing?.listPrice)}</s></span>}
                            </p>
                        }

                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            {loading ? <Skeleton /> :
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
                                            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
                                            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
                                            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-900">
                                            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0 text-gray-200">
                                            <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="sr-only">4 out of 5 stars</p>
                                    <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                                </div>
                            }
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Form action={cartAction}>
                                <input type="hidden" name="listingId" value={listingID} />
                                <Button type="submit" isDisabled={cartPending} className="rounded-md border-transparent bg-indigo-600 px-4 py-2 text-base text-sm text-white shadow-xs hover:bg-indigo-700 hover:cursor-pointer">
                                    Add to cart
                                </Button>
                            </Form>
                            <Form action={wishlistAction}>
                                <input type="hidden" name="listingId" value={listingID} />
                                <Button type="submit" isDisabled={wishlistPending} className="rounded-md border-transparent bg-indigo-600 px-4 py-2 text-base text-sm text-white shadow-xs hover:bg-indigo-700 hover:cursor-pointer">
                                    Add to wishlist
                                </Button>
                            </Form>
                        </div>

                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 ">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                {loading ? <Skeleton /> : <p className="text-base text-gray-900">{`The ${listing?.vehicle.model} (${listing?.vehicle.year}) is a(n) ${listing?.vehicle.vehicleType.typeName} made by the trusted ${listing?.vehicle.vehicleMake.makeName}`}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
                    {listing &&
                        <ImageCarousel listingImages={listing.vehicle.images} />
                    }
                </div>

            </div>
        </div>

    );
}

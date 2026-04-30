"use client";

import { useActionState, useEffect, useState } from "react";
import { ListingModel } from "@/types";
import { getWishlistListings, moveListingToCart, removeListingFromWishlist } from "@/app/actions/wishlistActions";
import Link from "next/link";
import { formatPrice, getListingPrice } from "@/app/utils/listingUtils";
import { Button, Form, Separator } from "react-aria-components";
import { toast } from "react-toastify";

export default function Page() {
  const [listings, setListings] = useState<ListingModel[]>([]);
  const [moveState, moveAction, movePending] = useActionState(moveListingToCart, { success: false, message: "" });
  const [removeState, removeAction, removePending] = useActionState(removeListingFromWishlist, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getWishlistListings().then((response) => (response !== undefined) ? setListings(response) : setListings([]));
  }, [removeState, moveState]);

  useEffect(() => {
    if (removeState.message === "") return;
    toast(removeState.message, {
      type: (removeState.success) ? "success" : "error",
    });
  }, [removeState]);

  useEffect(() => {
    if (moveState.message === "") return;
    toast(moveState.message, {
      type: (moveState.success) ? "success" : "error",
    });
  }, [moveState]);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans">
      <div className="mx-auto min-w-1/2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 grid-x-16 gap-y-10">
          <h2 className="sr-only">Cart Listings</h2>
          {(listings === null || listings.length === 0)
            ? <p className="text-gray-700 text-center">There are no items in your wishlist.</p>
            : <ul role="list" className="-my-6 divide-y divide-gray-200">
              {listings?.map((wishlistListing, key) => (
                <div key={key}>
                  <li className="flex py-6">
                    <div className="flex flex-row flex-1 py-2 justify-between size-48">
                      <img src={wishlistListing.vehicle.images[0].imageURI} className="shrink-0 overflow-hidden rounded-md border border-gray-400"></img>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="hover:underline">
                              <Link href={`/listing/${wishlistListing.listingID}`}>{wishlistListing.name}</Link>
                            </h3>
                            <p className="ml-4">{formatPrice(getListingPrice(wishlistListing))}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{wishlistListing.vehicle.vehicleMake.makeName} - {wishlistListing.vehicle.model}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <Form action={moveAction}>
                            <input type="hidden" name="listingId" value={wishlistListing.listingID} />
                            <Button isDisabled={movePending} type="submit" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Move to Cart</Button>
                          </Form>
                          <Form action={removeAction}>
                            <input type="hidden" name="listingId" value={wishlistListing.listingID} />
                            <Button isDisabled={removePending} type="submit" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Remove</Button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <Separator />
                </div>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}

"use client";

import { ListingModel } from "@/types";
import Link from "next/link";
import { Button, Form, Separator } from "react-aria-components";
import { formatPrice, getListingPrice, getTotalPrice } from "@/app/utils/listingUtils";
import { useActionState, useEffect, useState } from "react";
import { getUserCartListings, removeListingFromCart } from "@/app/actions/cartActions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function Page() {
  const [listings, setListings] = useState<ListingModel[]>([]);
  const [removeState, removeAction, removePending] = useActionState(removeListingFromCart, { success: false, message: "" });

  useEffect(() => {
    getUserCartListings().then((response) => (response !== undefined) ? setListings(response) : setListings([]));
  }, [removeState]);

  useEffect(() => {
    if (removeState.message === "") return;
    toast(removeState.message, {
      type: (removeState.success) ? "success" : "error",
    });
  }, [removeState]);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans">
      <div className="mx-auto min-w-1/2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {(listings === undefined || listings.length === 0)
          ? <p className="text-gray-700 text-center">There are no items in your cart.</p>
          : <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-1 grid-x-16 gap-y-10">
              <h2 className="sr-only">Cart Listings</h2>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {listings?.map((cartListing, key) => (
                  <div key={key}>
                    <li className="flex py-6">
                      <div className="flex flex-row flex-1 py-2 justify-between size-48">
                        <img src={cartListing.vehicle.images[0].imageURI} className="shrink-0 overflow-hidden rounded-md border border-gray-400"></img>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="hover:underline">
                                <Link href={`/listing/${cartListing.listingID}`}>{cartListing.name}</Link>
                              </h3>
                              <p className="ml-4">{formatPrice(getListingPrice(cartListing))}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{cartListing.vehicle.vehicleMake.makeName} - {cartListing.vehicle.model}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <Form action={removeAction}>
                              <input type="hidden" name="listingId" value={cartListing.listingID} />
                              <Button isDisabled={removePending} type="submit" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                                Remove
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </li>
                    <Separator />
                  </div>
                ))}
              </ul>
            </div>
            <div className="mx-10">
              <Form className="fixed bg-zinc-50 border border-gray-200 rounded-md px-4 py-6 sm:px-6"
                onSubmit={e => {
                  e.preventDefault();
                  redirect("/transaction/success");
                }}>
                <div className="flex justify-between text-base font-medium text-gray-900" >
                  <p>Subtotal </p>
                  <p>{formatPrice(getTotalPrice(listings))}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500" > Shipping and taxes calculated at checkout.</p>
                <Button type="submit" className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 hover:cursor-pointer" >
                  Checkout
                </Button>
              </Form>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

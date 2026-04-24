"use client";

import { ListingModel } from "@/types";
import Link from "next/link";
import { Button, Separator } from "react-aria-components";
import { formatPrice, getListingPrice } from "@/app/utils/listingUtils";

export default function Listings({ listings }: { listings: ListingModel[] }) {
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                  <Button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Add to Cart</Button>
                  <Button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Remove</Button>
                </div>
              </div>
            </div>
          </li>
          <Separator />
        </div>
      ))}
    </ul>
  );
}

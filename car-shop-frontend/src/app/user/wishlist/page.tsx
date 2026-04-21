"use server";

import { getWishlistListings } from "@/app/lib/dal";
import Listings from "./Listings";

export default async function Page() {
  const listings = await getWishlistListings();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans">
      <div className="mx-auto min-w-1/2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 grid-x-16 gap-y-10">
          <h2 className="sr-only">Cart Listings</h2>
          {(listings === null || listings.length === 0)
            ? <p className="text-gray-700 text-center">There are no items in your wishlist.</p>
            : <Listings listings={listings} />}
        </div>
      </div>
    </div>
  );
}

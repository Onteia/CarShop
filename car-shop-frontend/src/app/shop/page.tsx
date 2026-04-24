"use server";

import { getListings } from "@/app/lib/dal";
import { ShopListing } from "./ShopListings";

export default async function Page() {
  const listings = await getListings();

  return (
    <div className="grow bg-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Listings</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <ShopListing listings={listings} />
        </div>
      </div>
    </div>
  );
}

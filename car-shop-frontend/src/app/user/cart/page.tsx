"use server";

import { getUserCartListings } from "@/app/lib/dal";
import Listings from "../Listings";
import { Checkout } from "./Checkout";

export default async function Page() {
  const listings = await getUserCartListings();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans">
      <div className="mx-auto min-w-1/2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-4">
          <div className="col-span-3 grid grid-cols-1 grid-x-16 gap-y-10">
            <h2 className="sr-only">Cart Listings</h2>
            <Listings listings={listings} />
          </div>
          <div className="mx-10">
            <Checkout listings={listings} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery, useMutation, useQueryClient, QueryCache } from "@tanstack/react-query";
import { ListingModel } from "@/types";
import Link from "next/link";

async function fetchListings(): Promise<ListingModel[]> {
  const response = await fetch("http://localhost:5011/listings", { mode: "cors" });
  return response.json();
}

export default function Page() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Listings</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.map((listing, key) => (
            <Link key={key} href={"listing/" + listing.listingID} className="group">
              <img src={listing.vehicle.images[0]?.imageURI}></img>
              <h3 className="mt-4 text-sm text-gray-700">{listing.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{listing.listPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

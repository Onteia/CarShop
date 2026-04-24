import { ListingModel } from "@/types";
import Link from "next/link";

export function ShopListing({ listings }: { listings: ListingModel[] | null }) {
  return (
    <>
      {listings?.map((listing, key) => (
        <Link key={key} href={"listing/" + listing.listingID} className="group">
          <img src={listing.vehicle.images[0]?.imageURI}></img>
          <h3 className="mt-4 text-sm text-gray-700">{listing.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{listing.listPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        </Link>
      ))}
    </>
  );
}

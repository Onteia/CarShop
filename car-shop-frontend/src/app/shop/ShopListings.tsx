import { ListingModel } from "@/types";
import Link from "next/link";
import { formatPrice, getListingPrice } from "../utils/listingUtils";

export function ShopListing({ listings }: { listings: ListingModel[] | null }) {
  return (
    <>
      {listings?.map((listing, key) => (
        <Link key={key} href={"listing/" + listing.listingID} className="group border rounded-md bg-white p-2 flex flex-col justify-between">
          <img className="rounded-md" src={listing.vehicle.images[0]?.imageURI}></img>
          <div>
            <h3 className="mt-4 text-sm text-gray-700">{listing.name}</h3>
            <div className="flex flex-row justify-between">
              <p className="mt-1 text-lg font-medium text-gray-900">{formatPrice(getListingPrice(listing))}</p>
              {(listing?.listPrice !== getListingPrice(listing)) && <span style={{ whiteSpace: "pre", fontSize: 12, verticalAlign: "center" }} className="text-gray-400 self-end">    List: <s>{formatPrice(listing?.listPrice)}</s></span>}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

"use server";

import { Input } from "react-aria-components";
import { getListings } from "../actions/listingActions";
import { ShopListing } from "./ShopListings";
import { FilterCriteria } from "./FilterCriteria";
import { getListingPrice, getTotalPrice } from "../utils/listingUtils";
import SearchTerm from "./SearchTerm";
import { getVehicleTypes } from "../actions/vehicleTypeActions";
import { getVehicleMakes } from "../actions/vehicleMakeActions";

export default async function Page(props: {
  searchParams?: Promise<SearchTerm>;
}) {
  const searchParams = await props.searchParams;

  const vehicleTypes = await getVehicleTypes();
  const vehicleMakes = await getVehicleMakes();
  const listings = await getListings();
  let filteredListings = listings;

  if (searchParams) {
    filteredListings = listings.filter(l =>
      (!searchParams.listingName || l.name.toUpperCase().includes(searchParams.listingName.toUpperCase())) &&
      (!searchParams.modelName || l.vehicle.model.toUpperCase().includes(searchParams.modelName!.toUpperCase())) &&
      (!searchParams.onSale || (l.saleAmount !== undefined && l.saleAmount > 0)) &&
      (!searchParams.isUsed || l.vehicle.isUsed) &&
      (!searchParams.vehicleTypeID || (l.vehicle.vehicleType.vehicleTypeID === searchParams.vehicleTypeID)) &&
      (!searchParams.vehicleMakeID || (l.vehicle.vehicleMake.vehicleMakeID === searchParams.vehicleMakeID)) &&
      (!searchParams.price || (getListingPrice(l) <= searchParams.price))
    );
  }


  return (
    <div className="grow bg-zinc-50">
      <div className="flex flex-col lg:flex-row">
        <div className="min-h-full p-4 m-4 bg-white rounded-md outline-1">
          <FilterCriteria
            minYear={listings.reduce((prev, cur) => (prev <= cur.vehicle.year) ? prev : cur.vehicle.year, listings[0].vehicle.year)}
            maxYear={listings.reduce((prev, cur) => (prev >= cur.vehicle.year) ? prev : cur.vehicle.year, listings[0].vehicle.year)}
            minPrice={listings.reduce((prev, cur) => (prev <= cur.listPrice) ? prev : cur.listPrice, listings[0].listPrice)}
            maxPrice={listings.reduce((prev, cur) => (prev >= cur.listPrice) ? prev : cur.listPrice, listings[0].listPrice)}
            vehicleTypes={vehicleTypes}
            vehicleMakes={vehicleMakes}
          />
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Listings</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <ShopListing listings={filteredListings} />
          </div>
        </div>
      </div>
    </div>
  );
}

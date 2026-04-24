import { ListingModel } from "@/types";

export function getListingPrice(listing: ListingModel | undefined) {
    if (listing === undefined) return 0;
    if (listing.saleAmount === undefined || listing.saleAmount === 0) return listing.listPrice;

    return (100 - (listing.saleAmount)) / 100 * listing.listPrice;
}

export function formatPrice(price: number | undefined, currency = "USD"): string {
    if (price === undefined) return "";
    return price.toLocaleString("en-US", { style: "currency", currency: currency });
}

export function getTotalPrice(listings: ListingModel[] | null) {
    if (listings === null) return 0;

    var priceSum = 0;
    for (const listing of listings) {
        priceSum += getListingPrice(listing);
    }

    return priceSum;
}

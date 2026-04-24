"use client";

import { formatPrice, getTotalPrice } from "@/app/utils/listingUtils";
import { ListingModel } from "@/types";
import { redirect } from "next/navigation";
import { Button, Form } from "react-aria-components";

export function Checkout({ listings }: { listings: ListingModel[] | null }) {
    return (
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
    );
}

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";


export default function UserNavbar() {
    //const userID = cookieStore.get("userID");
    //if (userID === undefined) return (<></>);

    return (
        <Popover className="flow-root">
            <PopoverButton style={{ cursor: "pointer" }} className="block text-sm/6 font-medium text-gray-900 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
                <div className="-m-2 block p-2 font-medium text-gray-900">User</div>
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom"
                className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
            >
                <div className="p-3">
                    <Link className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="/user/cart">
                        <p className="font-semibold text-white">Cart</p>
                    </Link>
                    <Link className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="/user/wishlist">
                        <p className="font-semibold text-white">Wishlist</p>
                    </Link>
                </div>
            </PopoverPanel>
        </Popover>
    );
}

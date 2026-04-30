import Link from "next/link";
import { useState } from "react";
import { Button } from "react-aria-components";
import { LogOutUser } from "../actions/userActions";

export default function UserNavbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const openMenu = () => {
        setMenuOpen(true);
    };
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div onMouseEnter={openMenu} onMouseLeave={closeMenu}>
            <div style={{ cursor: "pointer" }} className="block text-sm/6 font-medium text-gray-900 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
                <div className="-m-2 block p-2 font-medium text-center text-gray-700 hover:text-gray-800">My Account</div>
            </div>
            <div
                className="fixed divide-y divide-white/5 border rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
            >
                <div hidden={!menuOpen} className="p-1">
                    <Link className="block rounded-lg px-3 py-2 transition hover:bg-black/10 text-gray-700 hover:text-gray-800" href="/user/cart">
                        <p>Cart</p>
                    </Link>
                    <Link className="block rounded-lg px-3 py-2 transition hover:bg-black/10 text-gray-700 hover:text-gray-800" href="/user/wishlist">
                        <p>Wishlist</p>
                    </Link>
                    <Button type="button" onClick={LogOutUser} className="block rounded-lg px-3 py-2 transition hover:bg-black/10 text-red-400 hover:text-red-600">
                        <p>Log Out</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}

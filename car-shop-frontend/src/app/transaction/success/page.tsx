import Link from "next/link";

export default function Page() {
    return (
        <div className="py-16 flex flex-col flex-1 items-center bg-zinc-50">
            <p className="text-gray-800">Thank you! Your order has shipped and will arrive soon!</p>
            <Link href="/shop" className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Continue shopping</Link>
        </div>
    );
}

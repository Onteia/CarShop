import Link from "next/link";

export default function Page() {
    return (
        <div className="py-16 flex flex-col flex-1 items-center bg-zinc-50">
            <p className="text-red-800">There was an error processing your order. Please try again later or contact support.</p>
            <Link href="/" className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Return to home page</Link>
        </div>
    );
}

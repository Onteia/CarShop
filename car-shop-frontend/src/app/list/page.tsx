"use client";

import { ListForm } from "./ListForm";

export default function Page() {
  return (
    <div className="grow bg-zinc-50">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Carketplace Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-800">Create Listing</h2>
        </div>

        <div className="mt-10 lg:mx-32">
          <ListForm />
        </div>
      </div >
    </div >
  );
}

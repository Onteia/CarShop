"use client";

import { VehicleMakeModel, VehicleTypeModel } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Label, Separator } from "react-aria-components";
import { useDebouncedCallback } from "use-debounce";
import SearchTerm from "./SearchTerm";

export function FilterCriteria({ minYear, maxYear, minPrice, maxPrice, vehicleTypes, vehicleMakes }:
  {
    minYear: number,
    maxYear: number,
    minPrice: number,
    maxPrice: number,
    vehicleTypes: VehicleTypeModel[],
    vehicleMakes: VehicleMakeModel[],
  }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerms, setSearchTerms] = useState<SearchTerm>({
    listingName: searchParams.get('listingName') ?? undefined,
    price: (searchParams.get('price')) ? parseFloat(searchParams.get('price')!) : undefined,
    onSale: searchParams.get('onSale') === 'true',
    modelName: searchParams.get('modelName') ?? undefined,
    isUsed: searchParams.get('isUsed') === 'true',
    vehicleTypeID: searchParams.get('vehicleTypeID') ?? undefined,
    vehicleMakeID: searchParams.get('vehicleMakeID') ?? undefined,
  });

  const handleSearch = (term: SearchTerm) => {
    const params = new URLSearchParams(searchParams);
    (term.listingName) ? params.set('listingName', term.listingName) : params.delete('listingName');
    (term.price) ? params.set('price', `${term.price}`) : params.delete('price');
    (term.onSale) ? params.set('onSale', `${term.onSale}`) : params.delete('onSale');
    (term.modelName) ? params.set('modelName', term.modelName) : params.delete('modelName');
    (term.isUsed) ? params.set('isUsed', `${term.isUsed}`) : params.delete('isUsed');
    (term.vehicleTypeID) ? params.set('vehicleTypeID', `${term.vehicleTypeID}`) : params.delete('vehicleTypeID');
    (term.vehicleMakeID) ? params.set('vehicleMakeID', `${term.vehicleMakeID}`) : params.delete('vehicleMakeID');

    replace(`${pathname}?${params.toString()}`);
  };

  const handleDelayedSearch = useDebouncedCallback((term: SearchTerm) => {
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        listingName: term.listingName ?? prevState.listingName,
        modelName: term.modelName ?? prevState.modelName,
        price: term.price ?? prevState.price,
      }
    })
  }, 300);

  useEffect(() => {
    console.log(searchTerms);
    handleSearch(searchTerms);
  }, [searchTerms]);

  const priceRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-full flex flex-col gap-4">

      {/*  Listing options  */}

      <div className="flex flex-row justify-between">
        <p className="text-black text-lg" style={{ fontWeight: "bold" }}>Listing</p>
        <Button className="text-gray-700 text-xs rounded-sm outline-1 py-0 px-1 hover:cursor-pointer bg-zinc-100 hover:bg-zinc-200" onClick={() => {
          setSearchTerms({});
        }}>Reset Filters</Button>
      </div>
      <Input placeholder="Search listing names" onChange={(e) => {
        handleDelayedSearch({ listingName: e.target.value })
      }}
        defaultValue={searchTerms.listingName}
        className="text-md bg-zinc-50 px-2 py-1 text-zinc-500 rounded-md outline-1"
      />
      <div className="flex flex-col">
        <Label htmlFor="priceRange" className="text-gray-800 text-sm">Price Range</Label>
        <div>
          <Input ref={priceRef} id="priceRange" className="w-full" type="range" defaultValue={maxPrice} min={minPrice} max={maxPrice} onChange={(e) => {
            handleDelayedSearch({ price: parseFloat(e.target.value) });
          }} />
          <div className="flex flex-row justify-between">
            <p className="text-xs text-zinc-500">{minPrice}</p>
            <p className="text-xs text-zinc-500">{`<= ${priceRef.current?.value || ''}`}</p>
            <p className="text-xs text-zinc-500 text-right">{maxPrice}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Input id="onSale" type="checkbox" onChange={(e) => {
          setSearchTerms((prevState) => {
            return {
              ...prevState,
              onSale: e.target.checked,
            };
          });
        }}
          checked={(searchTerms.onSale !== undefined) ? searchTerms.onSale : false}
        />
        <Label htmlFor="onSale" className="text-gray-800 text-sm">On Sale</Label>
      </div>
      <Separator />

      {/*  Vehicle options  */}

      <p className="text-black text-lg" style={{ fontWeight: "bold" }}>Vehicle</p>
      <Input placeholder="Search vehicle models" onChange={(e) => handleDelayedSearch({ modelName: e.target.value })}
        defaultValue={searchTerms.modelName}
        className="text-md bg-zinc-50 px-2 py-1 text-zinc-500 rounded-md outline-1"
      />
      <div className="flex flex-row gap-2">
        <Input id="isUsed" type="checkbox" onChange={(e) => {
          setSearchTerms((prevState) => {
            return {
              ...prevState,
              isUsed: e.target.checked,
            };
          });
        }}
          checked={searchTerms.isUsed ?? false}
        />
        <Label htmlFor="isUsed" className="text-gray-800 text-sm">Is Used</Label>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="vehicleType" className="text-gray-800 text-md">Vehicle Type</Label>
        <ul>
          {vehicleTypes.map((type, key) =>
            <li key={key} className="flex flex-row gap-2">
              <Input id={`vehicleType_${key}`} type="radio" value={type.vehicleTypeID}
                onChange={(e) => {
                  setSearchTerms((prevState) => {
                    return {
                      ...prevState,
                      vehicleTypeID: e.target.value,
                    };
                  });
                }}
                checked={searchParams.get("vehicleTypeID") === type.vehicleTypeID}
              />
              <Label htmlFor={`vehicleType_${key}`} className="text-gray-800 text-sm">
                {type.typeName}
              </Label>
            </li>
          )}
        </ul>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="vehicleMake" className="text-gray-800 text-md">Vehicle Make</Label>
        <ul>
          {vehicleMakes.map((make, key) =>
            <li key={key} className="flex flex-row gap-2">
              <Input id={`vehicleMake_${key}`} type="radio" value={make.vehicleMakeID}
                checked={searchTerms?.vehicleMakeID === make.vehicleMakeID}
                onChange={(e) => {
                  setSearchTerms((prevState) => {
                    return {
                      ...prevState,
                      vehicleMakeID: e.target.value,
                    };
                  });
                }}
              />
              <Label htmlFor={`vehicleMake_${key}`} className="text-gray-800 text-sm">
                {make.makeName}
              </Label>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}


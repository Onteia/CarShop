"use client"

import { VehicleMakeModel, VehicleTypeModel } from "@/types";
import { Key, useActionState, useEffect, useRef, useState } from "react";
import { Button, ComboBox, FileTrigger, Form, Input, Label, ListBox, ListBoxItem, Popover, Separator } from "react-aria-components";
import { getVehicleMakes } from "../actions/vehicleMakeActions";
import { getVehicleTypes } from "../actions/vehicleTypeActions";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { createListing } from "@/app/actions/listingActions";
import { toast } from "react-toastify";

const MAX_SIZE = 50 * 1024 * 1024;

export function ListForm() {
  const [state, action, isPending] = useActionState(createListing, { success: false, message: "", data: undefined });
  const [vehMakes, setVehMakes] = useState<VehicleMakeModel[]>([]);
  const [vehTypes, setVehTypes] = useState<VehicleTypeModel[]>([]);
  const [selectedMake, setSelectedMake] = useState<Key | null>(null);
  const [selectedType, setSelectedType] = useState<Key | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const triggerRefMake = useRef<HTMLDivElement>(null);
  const triggerRefType = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getVehicleMakes().then((result) => {
      setVehMakes(result);
    });

    getVehicleTypes().then((result) => {
      setVehTypes(result);
    });
  }, []);

  useEffect(() => {
    if (state.message === "") return;
    toast(state.message, {
      type: (state.success) ? "success" : "error",
    });

    if (state.success) setImagePreviews([]);
  }, [state]);

  return (
    <Form action={action} className="lg:grid lg:grid-cols-2 lg:space-x-12">
      <div className="space-y-6">
        <div>
          <Label className="block text-lg font-medium text-gray-800 mb-8">Listing Information</Label>
          <Label htmlFor="listingName" className="block text-sm/6 font-medium text-gray-800">
            Listing Name
          </Label>
          <div className="mt-2">
            <Input
              id="listingName"
              name="listingName"
              type="text"
              required
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="listPrice" className="block text-sm/6 font-medium text-gray-800">
            List Price
          </Label>
          <div className="mt-2">
            <Input
              id="listPrice"
              name="listPrice"
              type="number"
              min={0}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="saleAmount" className="block text-sm/6 font-medium text-gray-800">
              Sale Amount
            </Label>
          </div>
          <div className="mt-2">
            <Input
              id="saleAmount"
              name="saleAmount"
              type="number"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>
        <Separator className="mb-4 lg:hidden" />
      </div>

      {/*    Vehicle Information    */}

      <div className="space-y-6">
        <Label className="block text-lg font-medium text-gray-800 mb-8">Vehicle Information</Label>
        <div className="flex flex-row justify-between gap-8">
          <div className="grow">
            <Label htmlFor="makeName" className="block text-sm/6 font-medium text-gray-800">
              Vehicle Make
            </Label>
            <div className="mt-2">
              <ComboBox ref={triggerRefMake} isRequired onChange={(key) => setSelectedMake(key as string)} name="makeName" aria-label="vehicleMake">
                <div className="min-w-full flex flex-row block rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                  <Input className="grow rounded-md bg-white text-base text-gray-800 placeholder:text-gray-500 focus:outline-0 sm:text-sm/6" />
                  <Button type="button" className="grow-w place-items-end text-gray-800">
                    <ChevronDownIcon className="w-5" />
                  </Button>
                </div>
                <Popover
                  triggerRef={triggerRefMake}
                  style={{ width: triggerRefMake.current?.offsetWidth }}
                  className="block bg-white rounded-md p-1 outline-1 -outline-offset-1 outline-gray-400"
                >
                  <ListBox>
                    {vehMakes.map((make) => (
                      <ListBoxItem key={make.vehicleMakeID} id={make.vehicleMakeID} className="px-3 px-1.5 rounded-md sm:text-sm/6 text-gray-800 hover:cursor-pointer hover:text-gray-800 hover:bg-black/10">{make.makeName}</ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </ComboBox>
              <Input type="hidden" name="makeId" value={selectedMake as string ?? ""} />
            </div>
          </div>
          <div className="grow">
            <Label htmlFor="vehicleType" className="block text-sm/6 font-medium text-gray-800">
              Vehicle Type
            </Label>
            <div className="mt-2">
              <ComboBox ref={triggerRefType} isRequired onChange={(key) => setSelectedType(key as string)} name="typeName" aria-label="vehicleType">
                <div className="min-w-full flex flex-row block rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                  <Input className="grow rounded-md bg-white text-base text-gray-800 placeholder:text-gray-500 focus:outline-0 sm:text-sm/6" />
                  <Button type="button" className="grow-w place-items-end text-gray-800">
                    <ChevronDownIcon className="w-5" />
                  </Button>
                </div>
                <Popover
                  triggerRef={triggerRefType}
                  style={{ width: triggerRefType.current?.offsetWidth }}
                  className="block bg-white rounded-md p-1 outline-1 -outline-offset-1 outline-gray-400"
                >
                  <ListBox>
                    {vehTypes.map((make) => (
                      <ListBoxItem key={make.vehicleTypeID} id={make.vehicleTypeID} className="px-3 px-1.5 rounded-md sm:text-sm/6 text-gray-800 hover:cursor-pointer hover:text-gray-800 hover:bg-black/10">{make.typeName}</ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </ComboBox>
              <Input type="hidden" name="typeId" value={selectedType as string ?? ""} />

            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-8">
          <div className="grow">
            <Label htmlFor="modelName" className="block text-sm/6 font-medium text-gray-800">
              Model Name
            </Label>
            <div className="mt-2">
              <Input
                id="modelName"
                name="modelName"
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="grow">
            <Label htmlFor="vehicleYear" className="block text-sm/6 font-medium text-gray-800">
              Vehicle Year
            </Label>
            <div className="mt-2">
              <Input
                id="vehicleYear"
                name="vehicleYear"
                type="number"
                inputMode="numeric"
                min={1900}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-1 gap-2">
          <Input
            id="isUsed"
            name="isUsed"
            type="checkbox"
            className="block bg-white text-base text-gray-800 placeholder:text-gray-500 focus:outline-indigo-500"
          />
          <Label htmlFor="isUsed" className="block text-sm/6 font-medium text-gray-800">
            Is Used?
          </Label>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="images" className="block text-sm/6 font-medium text-gray-800">
              Images
            </Label>
          </div>
          <div className="mt-2 block w-full rounded-md bg-white/5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
            <FileTrigger
              acceptedFileTypes={["image/*"]}
              allowsMultiple
              onSelect={(e) => {
                const imgs = e ? Array.from(e) : [];

                const totalSize = imgs.reduce((acc, img) => acc + img.size, 0);
                if (totalSize > MAX_SIZE) {
                  toast("Images exceed maximum size of 50MB", { type: "error" });
                  return;
                }

                setImagePreviews(imgs.map(i => URL.createObjectURL(i)));

                const dt = new DataTransfer();
                imgs.forEach(i => dt.items.add(i));
                if (fileInputRef.current) fileInputRef.current.files = dt.files;
              }}
            >
              <Button className="min-w-full hover:cursor-pointer hover:bg-indigo-50 rounded-md px-3 py-1.5">Upload image(s)</Button>
            </FileTrigger>
          </div>
          <input ref={fileInputRef} type="file" name="images" multiple accept="image/*" hidden />
          {(imagePreviews.length > 0 && imagePreviews !== undefined) &&
            <div className="mt-8 p-2 grid grid-cols-4 rounded-md outline-gray-400 outline-1 bg-white-5 gap-4 items-center lg:h-[250px] overflow-y-scroll">
              {imagePreviews.map((i, key) => (
                <div key={"div_" + key}>
                  <img key={"img_" + key} src={i} className=" min-w-1/4" />
                </div>
              ))}
            </div>
          }
        </div>

        <div className="text-red-400 text-sm">

        </div>
        <div>
          <Button
            type="submit"
            isDisabled={isPending}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-zinc-50 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Create Listing
          </Button>
        </div>

      </div>
    </Form>
  );
}

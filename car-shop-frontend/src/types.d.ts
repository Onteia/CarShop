export type AppUserModel = {
  userID: string,
  username: string,
  email: string,
  cart: CartModel,
  wishlist: WishlistModel,
};

export type CartModel = {
  cartID: string,
  listingToCart: ListingToCartModel[],
};

export type WishlistModel = {
  wishlistID: string,
  listingToWishlist: ListingToWishlistModel[],
};

export type ListingModel = {
  listingID: string,
  name: string,
  listPrice: number,
  saleAmount: number,
  vehicle: VehicleModel,
};

export type ListingToCartModel = {
  listingToCartID: string,
  listing: ListingModel,
  cart: CartModel,
};

export type ListingToWishlistModel = {
  listingToWishlistID: string,
  listing: ListingModel,
  wishlist: WishlistModel,
};

export type VehicleModel = {
  vehicleID: string,
  model: string,
  year: number,
  isUsed: boolean,
  vehicleType: VehicleTypeModel,
  vehicleMake: VehicleMakeModel,
  images: ImageModel[],
};

export type VehicleTypeModel = {
  vehicleTypeID: string,
  typeName: string,
};

export type VehicleMakeModel = {
  vehicleMakeID: string,
  makeName: string,
};

export type ImageModel = {
  imageID: string,
  imageURI: string,
};


import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "./main_wishlist/controller.wishlist";

class Wishlist {
  public add_wishlist = addWishlist;
  public remove_wishlist = removeWishlist;
  public get_wishlist = getWishlist;
}
export const WishlistIndex = new Wishlist();

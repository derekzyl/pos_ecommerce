"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistIndex = void 0;
const controller_wishlist_1 = require("./main_wishlist/controller.wishlist");
class Wishlist {
    add_wishlist = controller_wishlist_1.addWishlist;
    remove_wishlist = controller_wishlist_1.removeWishlist;
    get_wishlist = controller_wishlist_1.getWishlist;
}
exports.WishlistIndex = new Wishlist();

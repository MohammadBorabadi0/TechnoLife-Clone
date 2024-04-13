"use client";

import EmptyFavorites from "@/components/Profile/my-favorites/EmptyFavorites";
import FavoriteProductList from "@/components/Profile/my-favorites/favoriteProductList/FavoriteProductList";
import { useFavoriteProducts } from "@/store/store";

import { useRouter } from "next/navigation";

const FavoriteProductListScreen = () => {
  const { favoriteProducts, removeProductFromFavorites } = useFavoriteProducts(
    (state) => state
  );

  if (favoriteProducts.length === 0) {
    return <EmptyFavorites />;
  }

  return <FavoriteProductList favoriteProducts={favoriteProducts} />;
};

export default FavoriteProductListScreen;

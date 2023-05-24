import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/pages";
import React from "react";

type ProductPropsType = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductPropsType) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(product.id);

  return (
    <div key={product.id}>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60"
          />
          <p className="relative text-lg font-semibold text-white">
            {product.price}
          </p>
        </div>
      </div>
      <div className="mt-2">
        {quantity === 0 ? (
          <button
            onClick={() => increaseCartQuantity(product.id)}
            className="w-full rounded-md py-2 px-4 text-white bg-violet-900"
          >
            {" "}
            + Add to Cart
          </button>
        ) : (
          <div className="flex flex-col items-center  gap-2">
            <div className="flex items-center  gap-2">
              <button
                onClick={() => decreaseCartQuantity(product.id)}
                className="rounded-md py-2 px-4 text-white bg-violet-900"
              >
                -
              </button>
              <div>
                <span className="text-gray-700 font-bold">{quantity} </span>in
                cart
              </div>
              <button
                onClick={() => increaseCartQuantity(product.id)}
                className="rounded-md py-2 px-4 text-white bg-violet-900"
              >
                +
              </button>
            </div>

            <div className="">
              <button
                onClick={() => removeFromCart(product.id)}
                className="rounded-md mt-2 py-2 px-4 text-white bg-rose-500"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

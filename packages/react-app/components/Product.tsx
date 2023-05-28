/* eslint-disable @next/next/no-img-element */
// This component displays and enables the purchase of a product

// Importing the dependencies
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
// Import ethers to format the price of the product correctly
import { ethers } from "ethers";
// Import the useConnectModal hook to trigger the wallet connect modal
import { useConnectModal } from "@rainbow-me/rainbowkit";
// Import the useAccount hook to get the user's address
import { useAccount } from "wagmi";
// Import the toast library to display notifications
import { toast } from "react-toastify";
// Import our custom identicon template to display the owner of the product
import { useContractCall } from "@/hooks/useContractRead";
import { useContractSend } from "@/hooks/useContractWrite";
import { useShoppingCart } from "@/context/ShoppingCartContext";
// import { useContractApprove } from "@/hooks/contracts/useApprove";
// Import our custom hooks to interact with the smart contract

// Define the interface for the product, an interface is a type that describes the properties of an object
interface Product {
  product_title: string;
  image_url: string;
  category: string;
  location: string;
  price: number;
  sold: number;
  owner: string;
}

// Define the Product component which takes in the id of the product and some functions to display notifications
const Product = ({ id, setError, setLoading, clear }: any) => {
  //  const {
  //    getItemQuantity,
  //    increaseCartQuantity,
  //    decreaseCartQuantity,
  //    removeFromCart,
  //  } = useShoppingCart();

  //  const quantity = getItemQuantity(id);
  // Use the useAccount hook to store the user's address
  //   const { address } = useAccount();
  // Use the useContractCall hook to read the data of the product with the id passed in, from the marketplace contract
  const { data: rawProduct }: any = useContractCall("readProduct", [id], true);
  console.log(rawProduct)
  // Use the useContractSend hook to purchase the product with the id passed in, via the marketplace contract
  //   const { writeAsync: purchase } = useContractSend("buyProduct", [Number(id)]);
  const [product, setProduct] = useState<Product | null>(null);
  // Use the useContractApprove hook to approve the spending of the product's price, for the ERC20 cUSD contract
  //   const { writeAsync: approve } = useContractApprove(
  //     product?.price?.toString() || "0"
  //   );
  // Use the useConnectModal hook to trigger the wallet connect modal
  //   const { openConnectModal } = useConnectModal();
  // Format the product data that we read from the smart contract
  const getFormatProduct = useCallback(() => {
    if (!rawProduct) return null;
    setProduct({
      owner: rawProduct[0],
      product_title: rawProduct[1],
      image_url: rawProduct[2],
      category: rawProduct[3],
      location: rawProduct[4],
      price: Number(rawProduct[5]),
      sold: rawProduct[6].toString(),
    });
  }, [rawProduct]);

  // Call the getFormatProduct function when the rawProduct state changes
  useEffect(() => {
    getFormatProduct();
  }, [getFormatProduct]);

  // Define the handlePurchase function which handles the purchase interaction with the smart contract
  //   const handlePurchase = async () => {
  //     if (!approve || !purchase) {
  //       throw "Failed to purchase this product";
  //     }
  //     // Approve the spending of the product's price, for the ERC20 cUSD contract
  //     const approveTx = await approve();
  //     // Wait for the transaction to be mined, (1) is the number of confirmations we want to wait for
  //     await approveTx.wait(1);
  //     setLoading("Purchasing...");
  //     // Once the transaction is mined, purchase the product via our marketplace contract buyProduct function
  //     const res = await purchase();
  //     // Wait for the transaction to be mined
  //     await res.wait();
  //   };

  // Define the purchaseProduct function that is called when the user clicks the purchase button
  //   const purchaseProduct = async () => {
  //     setLoading("Approving ...");
  //     clear();

  //     try {
  //       // If the user is not connected, trigger the wallet connect modal
  //       if (!address && openConnectModal) {
  //         openConnectModal();
  //         return;
  //       }
  //       // If the user is connected, call the handlePurchase function and display a notification
  //       await toast.promise(handlePurchase(), {
  //         pending: "Purchasing product...",
  //         success: "Product purchased successfully",
  //         error: "Failed to purchase product",
  //       });
  //       // If there is an error, display the error message
  //     } catch (e: any) {
  //       console.log({ e });
  //       setError(e?.reason || e?.message || "Something went wrong. Try again.");
  //       // Once the purchase is complete, clear the loading state
  //     } finally {
  //       setLoading(null);
  //     }
  //   };

  // If the product cannot be loaded, return null
  if (!product) return null;

  // Format the price of the product from wei to cUSD otherwise the price will be way too high
  const productPriceFromWei = ethers.utils.formatEther(
    product.price.toString()
  );

  // Return the JSX for the product component
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            src={product.image_url}
            alt="product image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            {product.product_title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60"
          />
          <p className="relative text-lg font-semibold text-white">
            {productPriceFromWei} cUSD
          </p>
        </div>
      </div>
      {/* <div className="mt-2">
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
      </div> */}
    </div>
  );
};

export default Product;
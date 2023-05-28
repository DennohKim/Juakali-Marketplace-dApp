// This component is used to add a product to the marketplace and show the user's cUSD balance

// Importing the dependencies
import { ChangeEvent, useState, FormEvent } from "react";
// import ethers to convert the product price to wei
import { ethers } from "ethers";

// Import the toast library to display notifications
import { toast } from "react-hot-toast";

// Import the useDebounce hook to debounce the input fields
import { useDebounce } from "use-debounce";

// Import our custom useContractSend hook to write a product to the marketplace contract
import { useContractSend } from "@/hooks/useContractWrite";
import { Input } from "./ui/input";
import { CustomWindow } from "@/typings";
import { useRouter } from "next/navigation";


// The AddProductModal component is used to add a product to the marketplace
const ProductForm = () => {
  // The following states are used to store the values of the form fields
  const [productTitle, setProductTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<string | number>(0);
  // The following states are used to store the debounced values of the form fields
  const [debouncedProductTitle] = useDebounce(productTitle, 500);
  const [debouncedImageUrl] = useDebounce(imageUrl, 500);
  const [debouncedLocation] = useDebounce(location, 500);
  const [debouncedPrice] = useDebounce(price, 500);
  // The loading state is used to display a loading message
  const [loading, setLoading] = useState("");

  const router = useRouter()

  // Check if all the input fields are filled
  const isComplete = productTitle && imageUrl && category && location && price;

  // Clear the input fields after the product is added to the marketplace
  const clearForm = () => {
    setProductTitle("");
    setImageUrl("");
    setCategory("");
    setLocation("");
    setPrice(0);
  };

  // Convert the product price to wei

  const priceInWei = ethers.utils.parseEther(debouncedPrice.toString());

  // Use the useContractSend hook to use our writeProduct function on the marketplace contract and add a product to the marketplace
  const { writeAsync: createProduct } = useContractSend("writeProduct", [
    debouncedProductTitle,
    debouncedImageUrl,
    category,
    debouncedLocation,
    priceInWei,
  ]);

  // Define function that handles the creation of a product through the marketplace contract
const handleCreateProduct = async () => {
  if (!createProduct) {
    throw new Error("Failed to create product");
  }

  setLoading("Creating...");

  if (!isComplete) {
    throw new Error("Please fill all fields");
  }

  try {
    // Create the product by calling the writeProduct function on the marketplace contract
    const transaction = await createProduct();

    setLoading("Waiting for confirmation...");


    // Wait for the transaction to be mined and confirmed on the blockchain
    const provider = new ethers.providers.Web3Provider(
      (window as CustomWindow).ethereum
    );
    const confirmedTransaction = await provider.waitForTransaction(
      transaction.hash
    );

    // Clear the input fields after the product is added to the marketplace
    clearForm();
    router.refresh()
  } catch (error) {
    // Display an error notification or handle the error in an appropriate way
    console.error(error);
    toast.error("Something went wrong. Try again.");
  } finally {
    // Clear the loading state after the product is added to the marketplace
    setLoading("");
  }
};
  // Define function that handles the creation of a product, if a user submits the product form
  const addProduct = async (e: any) => {
    e.preventDefault();
    try {
      // Display a notification while the product is being added to the marketplace
      await toast.promise(handleCreateProduct(), {
        loading: "Creating product...",
        success: "Product created successfully",
        error: "Something went wrong. Try again.",
      });
      // Display an error message if something goes wrong
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong. Try again.");
      // Clear the loading state after the product is added to the marketplace
    } finally {
      setLoading("");
    }
  };

  // Define the JSX that will be rendered
  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div>
        {/* Form with input fields for the product, that triggers the addProduct function on submit */}
        <form onSubmit={addProduct}>
          {/* Input fields for the product */}
          <div className="bg-white pt-5 pb-4 sm:p-1 sm:pb-4">
            <div className="w-full flex justify-between space-x-4">
              <div>
                <label>Product Title</label>
                <Input
                  onChange={(e) => {
                    setProductTitle(e.target.value);
                  }}
                  required
                  type="text"
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
              </div>
              <div>
                <label>Product Image (URL)</label>
                <Input
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                  required
                  type="text"
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
              </div>
            </div>
            <div className="w-full flex justify-between space-x-4">
              <div className="flex-col">
                <label className="mb-3">Product Category</label>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option defaultValue="Select category">Select category</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="butchery">Butchery</option>
                  <option value="stainless">Stainless</option>
                </select>
              </div>

              <div>
                <label>Location</label>
                <Input
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                  type="text"
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
              </div>
            </div>
            <div>
              <label>Product Price (cUSD)</label>
              <Input
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
                type="number"
                className="w-full bg-gray-100 p-2 mt-2 mb-3"
              />
            </div>
          </div>
          {/* Button to close the modal */}
          <div className="py-2 text-right">
            {/* Button to add the product to the marketplace */}
            <button
              type="submit"
              disabled={!!loading || !isComplete || !createProduct}
              className="py-2 bg-primary w-full text-white rounded hover:bg-purple-700 mr-2"
            >
              {loading ? loading : "List product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

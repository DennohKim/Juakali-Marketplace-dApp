// This component is used to add a product to the marketplace and show the user's cUSD balance

// Importing the dependencies
import { useState } from 'react';
// import ethers to convert the product price to wei
import { ethers } from 'ethers';

// Import the toast library to display notifications
import { toast } from 'react-toastify';
// Import the useDebounce hook to debounce the input fields
import { useDebounce } from 'use-debounce';
// Import our custom useContractSend hook to write a product to the marketplace contract
import { useContractSend } from '@/hooks/contracts/useContractWrite';

// The AddProductModal component is used to add a product to the marketplace
const AddProductModal = () => {
  // The visible state is used to toggle the modal
  const [visible, setVisible] = useState(false);
  // The following states are used to store the values of the form fields
  const [productTitle, setProductTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<string | number>(0);
  // The following states are used to store the debounced values of the form fields
  const [debouncedProductTitle] = useDebounce(productTitle, 500);
  const [debouncedImageUrl] = useDebounce(imageUrl, 500);
  const [debouncedLocation] = useDebounce(location, 500);
  const [debouncedPrice] = useDebounce(price, 500);
  // The loading state is used to display a loading message
  const [loading, setLoading] = useState('');

  // Check if all the input fields are filled
  const isComplete = productTitle && imageUrl && category && location && price;

  // Clear the input fields after the product is added to the marketplace
  const clearForm = () => {
    setProductTitle('');
    setImageUrl('');
    setCategory('');
    setLocation('');
    setPrice(0);
  };

  // Convert the product price to wei
  const priceInWei = ethers.utils.parseEther(debouncedPrice.toString());

  // Use the useContractSend hook to use our writeProduct function on the marketplace contract and add a product to the marketplace
  const { writeAsync: createProduct } = useContractSend('writeProduct', [
    debouncedProductTitle,
    debouncedImageUrl,
    category,
    debouncedLocation,
    priceInWei,
  ]);

  // Define function that handles the creation of a product through the marketplace contract
  const handleCreateProduct = async () => {
    if (!createProduct) {
      throw 'Failed to create product';
    }
    setLoading('Creating...');
    if (!isComplete) throw new Error('Please fill all fields');
    // Create the product by calling the writeProduct function on the marketplace contract
    const purchaseTx = await createProduct();
    setLoading('Waiting for confirmation...');
    // Wait for the transaction to be mined
    await purchaseTx.wait();
    // Close the modal and clear the input fields after the product is added to the marketplace
    setVisible(false);
    clearForm();
  };

  // Define function that handles the creation of a product, if a user submits the product form
  const addProduct = async (e: any) => {
    e.preventDefault();
    try {
      // Display a notification while the product is being added to the marketplace
      await toast.promise(handleCreateProduct(), {
        pending: 'Creating product...',
        success: 'Product created successfully',
        error: 'Something went wrong. Try again.',
      });
      // Display an error message if something goes wrong
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message || 'Something went wrong. Try again.');
      // Clear the loading state after the product is added to the marketplace
    } finally {
      setLoading('');
    }
  };

  // Define the JSX that will be rendered
  return (
    <div className={'flex flex-row w-full justify-between'}>
      <div>
        {/* Add Product Button that opens the modal */}
        <button
          type='button'
          onClick={() => setVisible(true)}
          className='inline-block ml-4 px-6 py-2.5 bg-primary text-white font-medium text-md leading-tight rounded-lg shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out'
          data-bs-toggle='modal'
          data-bs-target='#exampleModalCenter'
        >
          Add Product
        </button>

        {/* Modal */}
        {visible && (
          <div
            className='fixed z-40 overflow-y-auto top-0 w-full left-0 '
            id='modal'
          >
            {/* Form with input fields for the product, that triggers the addProduct function on submit */}
            <form onSubmit={addProduct} className=''>
              <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                  <div className='absolute inset-0 bg-gray-900 opacity-75' />
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                  &#8203;
                </span>
                <div
                  className='inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  {/* Input fields for the product */}
                  <div className='p-6 space-y-4'>
                    <div className='w-full flex justify-between space-x-4'>
                      <div>
                        <label>Product Title</label>
                        <input
                          onChange={(e) => {
                            setProductTitle(e.target.value);
                          }}
                          required
                          type='text'
                          className='w-full bg-gray-100 p-2 mt-2 mb-3'
                        />
                      </div>
                      <div>
                        <label>Product Image (URL)</label>
                        <input
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                          }}
                          required
                          type='text'
                          className='w-full bg-gray-100 p-2 mt-2 mb-3'
                        />
                      </div>
                    </div>
                    <div className='w-full flex justify-between space-x-4'>
                      <div className='flex-col'>
                        <label className='mb-3'>Product Category</label>

                        <select
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          className='w-full bg-gray-100 p-2 mt-2 mb-3'
                        >
                          <option defaultValue='Select category'>
                            Select category
                          </option>
                          <option value='kitchen'>Kitchen</option>
                          <option value='restaurant'>Restaurant</option>
                          <option value='butchery'>Butchery</option>
                          <option value='stainless'>Stainless</option>
                        </select>
                      </div>

                      <div>
                        <label>Location</label>
                        <input
                          onChange={(e) => {
                            setLocation(e.target.value);
                          }}
                          required
                          type='text'
                          className='w-full bg-gray-100 p-2 mt-2 mb-3'
                        />
                      </div>
                    </div>
                    <div>
                      <label>Product Price (cUSD)</label>
                      <input
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        required
                        type='number'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                  </div>

                  {/* Button to close the modal */}
                  <div className='bg-gray-200 px-4 py-3 text-right'>
                    <button
                      type='button'
                      className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 mr-2'
                      onClick={() => setVisible(false)}
                    >
                      <i className='fas fa-times'></i> Cancel
                    </button>
                    {/* Button to add the product to the marketplace */}
                    <button
                      type='submit'
                      disabled={!!loading || !isComplete || !createProduct}
                      className='py-2 px-4 bg-primary text-white rounded hover:bg-purple-900 mr-2'
                    >
                      {loading ? loading : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductModal;

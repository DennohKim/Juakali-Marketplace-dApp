import Product from '@/components/Product';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { iProduct } from './ShoppingCartContext';

type MarketPlaceProviderProps = {
  children: React.ReactNode;
}

type MarketPlaceContextType = {
  getProducts: any;
  error: any;
  success: any;
  loading: any;
  clear: any;
  setError: any;
  setSuccess: any;
  setLoading: any;
 
};

export const MarketPlaceContext = createContext({} as MarketPlaceContextType);

export function useMarketPlace() {
  return useContext(MarketPlaceContext);
}

export default function MarketPlaceProvider({
  children,
}: MarketPlaceProviderProps) {

  // Use the useContractCall hook to read how many products are in the marketplace contract
  const { data } = useContractCall('getProductsLength', [], true);
  // Convert the data to a number
  const productLength = data ? Number(data.toString()) : 0;
  // Define the states to store the error, success and loading messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError('');
    setSuccess('');
    setLoading('');
  };
  // Define a function to return the products
  const getProducts = useCallback(() => {
    // If there are no products, return null
    if (!productLength) return [];
    const juakaliProducts = [];
    // Loop through the products, return the Product component and push it to the products array
    for (let i = 0; i < productLength; i++) {
      juakaliProducts.push(
        <Product
          key={i}
          id={i}
          setSuccess={setSuccess}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
          clear={clear}
        />
      );
    }

    return juakaliProducts;
  }, [loading, productLength]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  

  return (
    <MarketPlaceContext.Provider
      value={{
        getProducts,
        error,
        success,
        loading,
        setError,
        setSuccess,
        setLoading,
        clear
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
}

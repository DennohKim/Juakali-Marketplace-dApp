import { Input } from '@/components/ui/input';
import { useMarketPlace } from '@/context/MarketPlaceContext';

export default function Search() {

	const { handleSearch } = useMarketPlace();
  return (
    <div>
      <Input
        type='search'
        placeholder='Search product...'
        className='h-9 md:w-[100px] lg:w-[300px]'
		onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

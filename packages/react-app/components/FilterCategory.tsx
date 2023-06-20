import { useMarketPlace } from '@/context/MarketPlaceContext';
import React, { useState, ChangeEvent } from 'react';

export default function FilterCategory() {
 

  const { selectedItemCategory, handleCategoryChange } = useMarketPlace();


  return (
    <div className=''>
      <div className='flex'>
        <select
          onChange={handleCategoryChange}
          value={selectedItemCategory}
          className='h-9 md:w-[80px] lg:w-[150px] rounded-md px-2'
        >
          <option value=''>All</option>
          <option value='kitchen'>Kitchen</option>
          <option value='restaurant'>Restaurant</option>
          <option value='butchery'>Butchery</option>
          <option value='bakery'>Bakery</option>
          <option value='stainless'>Stainless</option>
        </select>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const groups = [
  {
    label: 'Product Categroy',
    categories: [
      {
        label: 'Kitchen',
        value: 'kitchen',
      },
      {
        label: 'Restaurant',
        value: 'restaurant',
      },
      {
        label: 'Bakery',
        value: 'bakery',
      },
      {
        label: 'Butchery',
        value: 'butchery',
      },
      {
        label: 'Stainless',
        value: 'stainless',
      },
    ],
  },
];

type Category = (typeof groups)[number]['categories'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CategorySwitcherProps extends PopoverTriggerProps {}

export default function FilterByCategory({ className }: CategorySwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    groups[0].categories[0]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a Category'
          className={cn('w-[200px] justify-between', className)}
        >
          {selectedCategory.label}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search Category...' />
            <CommandEmpty>No category found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    onSelect={() => {
                      setSelectedCategory(category);
                      setOpen(false);
                    }}
                    className='text-sm'
                  >
                    {category.label}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedCategory.value === category.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

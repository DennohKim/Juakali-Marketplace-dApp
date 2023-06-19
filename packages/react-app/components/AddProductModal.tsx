import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ProductForm from './ProductForm';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function AddProductModal() {
  return (
    <div className='font-sans'>
      <AlertDialog>
        <AlertDialogTrigger className='px-4 py-2 border border-button rounded-md  text-button hover:bg-button hover:text-white'>
          List product
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader className='flex flex-row items-center justify-between pb-2'>
            <AlertDialogTitle>List a Juakali product</AlertDialogTitle>
            <AlertDialogCancel className='border-none'>
              <XCircleIcon className='h-6 w-6' />
            </AlertDialogCancel>
          </AlertDialogHeader>
          <ProductForm />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

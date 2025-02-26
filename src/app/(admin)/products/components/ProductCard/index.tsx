"use client";
import { FC, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEllipsis, 
} from "@fortawesome/free-solid-svg-icons";
import { ProductResponse } from '@/types/product';
import { 
  Card, Dropdown, DropdownItem, 
} from "flowbite-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { AssignedWarehouse } from '@/types/product';
import AddStockModal from '../AddStockModal';
import RequestStockModal from '../RequestStockModal';
import { useToast } from "@/providers/ToastProvider";

interface AdminProductCardProps {
  warehouse: AssignedWarehouse;
  product: ProductResponse;
  session: Session | null;
}

const AdminProductCard: FC<AdminProductCardProps> = ({
  warehouse,
  product,
  session
}) => {
  const [ isAddModalOpen, setAddModalOpen ] = useState<boolean>(false);
  const [ isReqModalOpen, setReqModalOpen ] = useState<boolean>(false);
  const { showToast } = useToast();

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencySign: 'accounting',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  });

  const handleUnselectedWarehouse = (modalType: string) => {
    if (warehouse.id === 0) {
      showToast("Please choose warehouse first", "error");
      return;
    }
    modalType === "add" ? setAddModalOpen(true) : setReqModalOpen(true)
  }

  return (
    <>
      <Card key={product.id} className="max-w-sm">
        <div className="flex gap-2">
          <div className="w-1/3">
            <div className="flex w-20 aspect-[9/6] relative">
              <Image
                src={product?.image.imageUrl}
                alt="product-image"
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
              />
            </div>
          </div>
          <div className="w-4/6 flex flex-col gap-1">
            <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {currencyFormatter.format(product.price)}
            </p>
          </div>
          <div className="w-1/6">
            <div className="mr-3 w-5">
              <Dropdown label={<FontAwesomeIcon icon={faEllipsis} />} inline arrowIcon={false}>
                <DropdownItem as={Link} href={`/products/detail/${product.id}`}>Detail</DropdownItem>
                {
                  session?.user.roles.includes("SUPER_ADMIN") && (
                    <DropdownItem as={Link} href={`/update-product/${product.id}`}>Update</DropdownItem>
                  )
                }
                <DropdownItem onClick={() => handleUnselectedWarehouse("add")}>Add Stock</DropdownItem>
                <DropdownItem onClick={() => handleUnselectedWarehouse("req")}>Request Stock</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">{product?.quantity} Remaining</span>
        </div>
        <AddStockModal isOpen={isAddModalOpen} setOpen={setAddModalOpen} 
          session={session} product={product} warehouse={warehouse} />
        <RequestStockModal isOpen={isReqModalOpen} setOpen={setReqModalOpen} 
          session={session} product={product} warehouse={warehouse} />
      </Card>
    </>
  )
}

export default AdminProductCard;
"use client";
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { ProductResponse } from '@/types/product';
import { Session } from "next-auth";
import { AssignedWarehouse } from '@/types/product';
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { 
  Button, TextInput, 
  Label, Modal, 
} from "flowbite-react";
import ConfirmationModal from '@/components/ConfirmationModal';
import VendorSearchField from '../VendorSearchField';
import { AddProductStockRequest } from '@/types/mutation';
import useAddStock from '@/hooks/mutation/useAddStock';

interface AddStockModalProps {
  warehouse: AssignedWarehouse;
  product: ProductResponse;
  session: Session | null;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  vendorId: Yup.number()
    .moreThan(0, "Vendor is required")
    .required("Vendor is required"),
  quantity: Yup.number()
    .moreThan(0, "Quantity must be greater than 0")
    .required("Quantity is required"),
});

const AddStockModal: FC<AddStockModalProps> = ({
  warehouse,
  product,
  session,
  isOpen,
  setOpen
}) => {
  const [ openModalConfirmation, setOpenModalConfirmation ] = useState<boolean>(false);
  const { addStock } = useAddStock(session?.accessToken as string)
  const initialValues: AddProductStockRequest = {
    productId: product.id,
    vendorId: 0,
    warehouseId: warehouse.id,
    quantity: 0,
  }
  const handleSubmit = async (
    values: AddProductStockRequest
  ) => {
    addStock({creationData: values});
  }

  return (
    <>
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <Formik<AddProductStockRequest>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={()=>{
            setOpenModalConfirmation(true);
          }}
        >
          {({ setSubmitting, isSubmitting, values }) => (
            <Form className="flex flex-col w-full">
              <Modal.Header>
                Add Stock
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Label htmlFor="product" className="font-medium">Product</Label>
                  <TextInput value={product.name} id="product" name="product" disabled />
                </div>
                <div>
                  <Label htmlFor="vendorId" className="font-medium">
                    Vendor
                  </Label>
                  <Field component={VendorSearchField} id="vendorId" session={session}
                    name="vendorId" placeholder="Select Vendor" />
                </div>
                <div>
                  <Label htmlFor="destination" className="font-medium">Warehouse</Label>
                  <TextInput value={warehouse.name} id="destination" name="destination" disabled />
                </div>
                <div>
                  <Label htmlFor="quantity" className="font-medium">Quantity</Label>
                  <Field as={TextInput} id="quantity" name="quantity" placeholder="Enter quantity" />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between bg-ghost-white">
                <Button color="gray" onClick={() => {
                  setOpen(false);
                }} disabled={isSubmitting}>Cancel</Button>
                <Button color="blue" disabled={isSubmitting} type="submit">
                  <span className="capitalize">Submit</span>
                </Button>
              </Modal.Footer>

              <ConfirmationModal 
                isOpen={openModalConfirmation}
                onClose={()=>{
                  setSubmitting(false);
                  setOpenModalConfirmation(false);
                }}
                onConfirm={()=>{
                  handleSubmit(values);
                  setOpen(false);
                }}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddStockModal;
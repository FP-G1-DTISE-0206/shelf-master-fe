"use client";
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { ProductResponse } from '@/types/product';
import { Session } from "next-auth";
import { AssignedWarehouse } from '@/types/product';
import { InternalProductMutationRequest } from '@/types/mutation';
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { 
  Button, TextInput, 
  Label, Modal, 
} from "flowbite-react";
import ConfirmationModal from '@/components/ConfirmationModal';
import WarehouseSearchField from '../WarehouseSearchField';
import useRequestStock from '@/hooks/mutation/useRequestStock';

interface RequestStockModalProps {
  warehouse: AssignedWarehouse;
  product: ProductResponse;
  session: Session | null;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  warehouseOriginId: Yup.number()
    .moreThan(0, "Warehouse Origin is required")
    .required("Warehouse Origin is required"),
  quantity: Yup.number()
    .moreThan(0, "Quantity must be greater than 0")
    .required("Quantity is required"),
});

const RequestStockModal: FC<RequestStockModalProps> = ({
  warehouse,
  product,
  session,
  isOpen,
  setOpen
}) => {
  const [ openModalConfirmation, setOpenModalConfirmation ] = useState<boolean>(false);
  const { reqStock } = useRequestStock(session?.accessToken as string);
  const initialValues: InternalProductMutationRequest = {
    productId: product.id,
    warehouseOriginId: 0,
    warehouseDestinationId: warehouse.id,
    quantity: 0,
  }
  const handleSubmit = async (
    values: InternalProductMutationRequest
  ) => {
    reqStock({ creationData: values })
  };

  return (
    <>
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <Formik<InternalProductMutationRequest>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={()=>{
            setOpenModalConfirmation(true);
          }}
        >
          {({ setSubmitting, isSubmitting, values }) => (
            <Form className="flex flex-col w-full">
              <Modal.Header>
                Request Stock
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Label htmlFor="product" className="font-medium">Product</Label>
                  <TextInput value={product.name} id="product" name="product" disabled />
                </div>
                <div>
                  <Label htmlFor="warehouseOriginId" className="font-medium">
                    Origin Warehouse
                  </Label>
                  <Field component={WarehouseSearchField} id="warehouseOriginId" 
                    session={session} excludeWarehouse={warehouse?.id}
                    name="warehouseOriginId" placeholder="Select origin warehouse" />
                </div>
                <div>
                  <Label htmlFor="destination" className="font-medium">To</Label>
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

export default RequestStockModal;
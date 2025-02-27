"use client";
import { FC, Dispatch, SetStateAction  } from 'react'
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { 
  Button, Textarea, 
  Label, Modal, 
} from "flowbite-react";
import { RejectionReasonRequest } from '@/types/mutation';

interface ReasonModalProps {
  setReason: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}

const validationSchema = Yup.object({
  reason: Yup.string()
    .max(255, "No more than 250 character")
    .required("Reason is required"),
});

const ReasonModal: FC<ReasonModalProps> = ({
  setReason,
  isOpen,
  setOpen
}) => {
  return (
    <>
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <Formik<RejectionReasonRequest>
          initialValues={{ reason: "" }}
          validationSchema={validationSchema}
          onSubmit={(value)=>{
            setReason(value.reason)
            setOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col w-full">
              <Modal.Header>
                Rejection Confirmation
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Label htmlFor="reason" className="font-medium">Reason</Label>
                  <Field as={Textarea} id="reason" name="reason" 
                    placeholder="Enter reason" rows={5} />
                  <ErrorMessage
                    name="reason"
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
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default ReasonModal;
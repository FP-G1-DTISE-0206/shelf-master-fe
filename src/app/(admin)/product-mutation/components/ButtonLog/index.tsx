"use client"
import { FC, useState } from 'react'
import {
  Button
} from "flowbite-react";
import dynamic from 'next/dynamic';

const Logs = dynamic(() => import("../MutationLogModal"), { ssr: false });

interface ButtonLogProps {
  mutationId: number;
}

const ButtonLog: FC<ButtonLogProps> = ({
  mutationId
}) => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  return (
    <>
      <Button color="blue" onClick={()=>{
        
      }}>View Log</Button>
      {
        isModalOpen && <Logs mutationId={mutationId} isOpen={isModalOpen} setOpen={setModalOpen} />
      }
    </>
  )
}

export default ButtonLog;
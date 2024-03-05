"use client";

import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onChange, children }) => {
  return (
    <Dialog.Root onOpenChange={onChange} open={isOpen} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-neutral-800/90 backdrop-blur-md fixed inset-0' />
        <Dialog.Content className='fixed drop-shadow-md border border-transparent top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-transparent p-[25px] focus:outline-none'>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

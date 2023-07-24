"use client";

import { IoMdClose } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";
import useAuthModal from "@/hooks/useAuthModal";

interface ModalProps {
  title: String | null;
  description: String | null;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean | undefined;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onChange,
  children,
  disabled,
}) => {
  const authModal = useAuthModal();

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            bg-neutral-900/90
        "
        />
        <Dialog.Content
          className="
            fixed
            border
            border-neutral-700
            bg-neutral-800
            top-[50%]
            left-[50%]
            translate-x-[-50%]
            translate-y-[-50%]
            p-[25px]
            rounded-md
            w-[450px]
            max-w-[90vw]
            h-auto
            hover:outline-none
            focus:outline-none
        "
        >
          <Dialog.Title
            className="
                text-xl
                font-bold
                text-center
                mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
                text-sm
                font-light
                text-[#22c55e]
                text-center
                mb-5
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              onClick={authModal.onClose}
              disabled={disabled}
              className="
                absolute
                top-[10px]
                right-[10px]
                p-2
                rounded-full
                items-center
                justify-center
                focus:outline-none
                text-neutral-400
                disabled:hidden
                hover:text-white
            "
            >
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string | null;
  description: string | null;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onChange,
  title,
  description,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 fixed inset-0" />
        <Dialog.Content
          className="
            fixed
            border
            border-neutral-700
            translate-x-[-50%]
            translate-y-[-50%]
            top-[50%]
            left-[50%]
            w-[90vw]
            md:w-[450px]
            h-auto
            rounded-md
            bg-neutral-800
            drop-shadow-md
            p-[25px]
            focus:outline-none
            "
        >
          <Dialog.Title
            className="
              text-xl
              text-center
              font-bold
              mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              text-sm
              text-center
              leading-normal
              mb-5
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
              absolute
              top-[10px]
              right-[10px]
              text-neutral-400
              hover:text-white
              h-[25px]
              w-[25px]
              flex
              rounded-full
              items-center
              justify-center
              focus:outline-none
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

import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ReactNode } from "react";

const BaseModal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        {children}
      </div>
    </Dialog>
  );
};

export default BaseModal;

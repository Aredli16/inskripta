"use client";

import { PulseLoader } from "react-spinners";
import { useFormStatus } from "react-dom";
import { ReactNode } from "react";

const SubmitButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className}>
      {pending ? <PulseLoader color="#312c85" /> : children}
    </button>
  );
};

export default SubmitButton;

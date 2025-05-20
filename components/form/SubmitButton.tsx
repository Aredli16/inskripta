"use client";

import { PulseLoader } from "react-spinners";
import { useFormStatus } from "react-dom";
import { ReactNode } from "react";
import clsx from "clsx";

const SubmitButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        className,
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
      disabled={pending}
    >
      {pending ? <PulseLoader color="#312c85" /> : children}
    </button>
  );
};

export default SubmitButton;

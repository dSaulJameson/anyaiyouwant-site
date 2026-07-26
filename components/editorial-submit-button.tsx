"use client";

import { useFormStatus } from "react-dom";

export function EditorialSubmitButton({
  children,
  busy = "Working...",
  className = "editorial-button",
}: {
  children: React.ReactNode;
  busy?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? busy : children}
    </button>
  );
}

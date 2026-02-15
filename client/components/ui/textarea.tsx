import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-gray-300 placeholder:text-gray-400 focus-visible:border-blue-600 focus-visible:ring-blue-600/20 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 bg-white flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base text-gray-900 shadow-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

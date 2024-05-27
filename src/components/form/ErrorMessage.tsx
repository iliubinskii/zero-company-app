import type { FieldError } from "../../schema/index.js";
import React from "react";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessages
}) => (
  <>
    <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full text-red-700 text-sm">
      <div className="flex flex-row justify-start gap-4">
        {errorMessages.map((field, index) => (
          <span className="inline-block" key={index}>
            {field.message}
          </span>
        ))}
      </div>
    </div>
  </>
);

export interface ErrorMessageProps {
  readonly errorMessages: FieldError[];
}

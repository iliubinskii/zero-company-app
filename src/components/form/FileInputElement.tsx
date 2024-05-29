"use client";

import type { Accept } from "react-dropzone";
import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React, { useCallback, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";
import { noop } from "lodash";
import styles from "./FileInputElement.module.css";
import { useDropzone } from "react-dropzone";

export const FileInputElement: React.FC<Props> = ({
  className = "",
  containerClassName = "",
  errorMessages = [],
  files,
  multiple = false,
  name,
  onResetErrors = noop,
  setFiles,
  ...props
}) => {
  const [errors, setErrors] = useState<readonly FieldError[]>([]);
  useEffect(() => {
    setErrors(errorMessages);
  }, [errorMessages]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreviews = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      setFiles(prevFiles =>
        multiple ? [...prevFiles, ...filesWithPreviews] : filesWithPreviews
      );
      onResetErrors(name);
      setErrors([]);
    },
    [multiple, name, setFiles, onResetErrors]
  );

  const accept: Accept = {
    "image/*": []
  };

  const { getInputProps, getRootProps } = useDropzone({
    accept,
    multiple,
    onDrop
  });

  const handleReset = (file: FileWithPreview): void => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  return (
    <div className={`relative ${containerClassName}`.trim()}>
      <div {...getRootProps()} className={styles["outer-container"]}>
        <input
          {...getInputProps()}
          {...props}
          className={`form-field w-full ${className}`.trim()}
        />
        {files.length === 0 ? (
          <p className={styles["text"]}>
            Drag & drop files here, or click to select files
          </p>
        ) : (
          <ul className={styles["preview-list"]}>
            {files.map(file => (
              <li className={styles["list-item"]} key={file.name}>
                <div className={styles["photo-item-container"]}>
                  <img
                    alt={file.name}
                    className={styles["image-preview"]}
                    src={file.preview}
                  />
                  <span className={styles["file-name"]}>{file.name}</span>
                </div>
                <SlClose
                  className={styles["icon"]}
                  onClick={event => {
                    event.stopPropagation();
                    handleReset(file);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors.length > 0 && <ErrorMessage errorMessages={errors} path={name} />}
    </div>
  );
};

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  readonly containerClassName?: string;
  readonly errorMessages?: readonly FieldError[];
  readonly files: readonly FileWithPreview[];
  readonly multiple?: boolean;
  readonly onResetErrors?: (name?: string) => void;
  readonly setFiles: React.Dispatch<
    React.SetStateAction<readonly FileWithPreview[]>
  >;
}

export interface FileWithPreview extends File {
  preview: string;
}

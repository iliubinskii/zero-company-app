import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React, { useCallback } from "react";
import { SlClose } from "react-icons/sl";
import { filterUndefinedProperties } from "../../utils";
import { lang } from "../../langs";
import { noop } from "lodash";
import styles from "./FileInputElement.module.css";
import { useDropzone } from "react-dropzone";

export const FileInputElement: React.FC<Props> = ({
  accept,
  className = "",
  errorMessages = [],
  files,
  multiple = false,
  name,
  onResetErrors = noop,
  // TS71007: Weird typescript error that appears only in the editor, switch to vscode's version of typescript
  setFiles,
  ...props
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreviews = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      if (multiple) setFiles(prevFiles => [...prevFiles, ...filesWithPreviews]);
      else setFiles(filesWithPreviews);

      onResetErrors(name);
    },
    [multiple, name, setFiles, onResetErrors]
  );

  const { getInputProps, getRootProps } = useDropzone(
    filterUndefinedProperties({
      accept: { [accept]: [] },
      multiple,
      onDrop
    })
  );

  const handleReset = (file: FileWithPreview): void => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  return (
    <div className={`relative ${className}`.trim()}>
      <div {...getRootProps()} className={styles["outer-container"]}>
        <input name={name} {...props} {...getInputProps()} />
        {files.length === 0 ? (
          <p className={styles["text"]}>{lang.dragAndDropPrompt}</p>
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
      {errorMessages.length > 0 && (
        <ErrorMessage errorMessages={errorMessages} path={name} />
      )}
    </div>
  );
};

export interface Props {
  readonly accept: string;
  readonly className?: string;
  readonly errorMessages?: readonly FieldError[];
  readonly files: readonly FileWithPreview[];
  readonly multiple?: boolean;
  readonly name?: string;
  readonly onResetErrors?: (name?: string) => void;
  readonly setFiles: React.Dispatch<
    React.SetStateAction<readonly FileWithPreview[]>
  >;
}

export interface FileWithPreview extends File {
  preview: string;
}

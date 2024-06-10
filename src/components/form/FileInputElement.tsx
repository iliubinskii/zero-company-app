import type { Dispatch, FC, SetStateAction } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { FieldError } from "../../schema";
import React, { useCallback } from "react";
import { SlClose } from "react-icons/sl";
import { lang } from "../../langs";
import { noop } from "lodash";
import tw from "tailwind-styled-components";
import { useDropzone } from "react-dropzone";

export const FileInputElement: FC<Props> = ({
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

  const { getInputProps, getRootProps } = useDropzone({
    accept: { [accept]: [] },
    multiple,
    onDrop
  });

  const handleReset = (file: FileWithPreview): void => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  return (
    <div className={`relative ${className}`.trim()}>
      <DroppableArea {...getRootProps()}>
        <input name={name} {...props} {...getInputProps()} />
        {files.length === 0 ? (
          <Prompt>
            {lang.components.form.FileInputElement.dragAndDropPrompt}
          </Prompt>
        ) : (
          <List>
            {files.map(file => (
              <ListItem key={file.preview}>
                <PreviewContainer>
                  <Preview alt={file.name} src={file.preview} />
                  <FileName>{file.name}</FileName>
                </PreviewContainer>
                <CloseIcon
                  onClick={event => {
                    event.stopPropagation();
                    handleReset(file);
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DroppableArea>
      {errorMessages.length > 0 && (
        <ErrorMessage errorMessages={errorMessages} path={name} />
      )}
    </div>
  );
};

export interface Props {
  readonly accept: string;
  readonly className?: string | undefined;
  readonly errorMessages?: readonly FieldError[] | undefined;
  readonly files: readonly FileWithPreview[];
  readonly multiple?: boolean | undefined;
  readonly name?: string | undefined;
  readonly onResetErrors?: (name?: string) => void;
  readonly setFiles: Dispatch<SetStateAction<readonly FileWithPreview[]>>;
}

export interface FileWithPreview extends File {
  preview: string;
}

const CloseIcon = tw(SlClose)`h-6 w-6 text-gray-500 cursor-pointer`;

const FileName = tw.span`text-center text-gray-500`;

const DroppableArea = tw.div`
  border-2 border-dashed border-gray-300 hover:border-gray-500
  rounded-md
  p-4
  cursor-pointer
`;

const List = tw.ul`list-disc list-inside flex flex-col gap-2`;

const ListItem = tw.li`flex items-center justify-between`;

const Preview = tw.img`h-10 w-10 object-cover rounded-md`;

const PreviewContainer = tw.div`flex items-center space-x-2`;

const Prompt = tw.p`h-10 flex justify-center items-center text-gray-500`;

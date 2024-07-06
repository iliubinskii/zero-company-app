import type { FieldError, WebAccessibleImage } from "../../schema";
import { ErrorMessage } from "./ErrorMessage";
import type { FC } from "react";
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
  onAddImages = noop,
  onRemoveImage = noop,
  onResetErrors = noop,
  ...props
}) => {
  const onDrop = useCallback(
    (acceptedFiles: readonly File[]) => {
      const filesWithPreviews = acceptedFiles.map(file =>
        // eslint-disable-next-line misc/typescript/no-unsafe-object-assign -- Ok
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      onAddImages(filesWithPreviews);
      onResetErrors(name);
    },
    [name, onAddImages, onResetErrors]
  );

  const { getInputProps, getRootProps } = useDropzone({
    accept: { [accept]: [] },
    multiple,
    onDrop
  });

  const handleReset = (file: CombinedFile): void => {
    onRemoveImage(file);

    if ("preview" in file) URL.revokeObjectURL(file.preview);
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
              <ListItem key={"preview" in file ? file.preview : file.assetId}>
                <PreviewContainer>
                  <Preview
                    alt={file.name}
                    src={"preview" in file ? file.preview : file.secureUrl}
                  />
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

export type CombinedFile = FileWithPreview | WebAccessibleImage;

export interface FileWithPreview extends File {
  readonly preview: string;
}

export interface Props {
  readonly accept: string;
  readonly className?: string | undefined;
  readonly errorMessages?: readonly FieldError[] | undefined;
  readonly files: readonly CombinedFile[];
  readonly multiple?: boolean | undefined;
  readonly name?: string | undefined;
  readonly onAddImages?:
    | ((images: readonly FileWithPreview[]) => void)
    | undefined;
  readonly onRemoveImage?: ((image: CombinedFile) => void) | undefined;
  readonly onResetErrors?: ((name?: string) => void) | undefined;
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

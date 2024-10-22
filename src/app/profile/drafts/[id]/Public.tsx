import {
  AsyncButton,
  FileInputElement,
  InputElement,
  TextareaElement
} from "../../../../components";
import type { FC } from "react";
import type { ModuleProps } from "./helpers";
import React from "react";
import { lang } from "../../../../langs";

export const Public: FC<ModuleProps> = ({
  company,
  errorMessages,
  images,
  isSubmitting,
  modified,
  onAddImages,
  onRemoveImage,
  onResetErrors,
  onSave,
  setUpdate
}) => (
  <form className="flex flex-col gap-11" onSubmit={onSave}>
    {/* Logo */}
    <div className="form-field-container">
      {lang.CompanyLogo}
      <FileInputElement
        accept="image/*"
        errorMessages={errorMessages}
        files={company.logo ? [company.logo] : []}
        name="logo"
        onAddImages={files => {
          setUpdate({ logo: files[0] ?? null });
        }}
        onRemoveImage={() => {
          setUpdate({ logo: null });
        }}
        onResetErrors={onResetErrors}
      />
    </div>
    {/* Logo END */}

    {/* Images */}
    <div className="form-field-container">
      {lang.CompanyImages}
      <FileInputElement
        accept="image/*"
        errorMessages={errorMessages}
        files={images}
        multiple
        name="images"
        onAddImages={files => {
          onAddImages(files);
        }}
        onRemoveImage={file => {
          onRemoveImage(file);
        }}
        onResetErrors={onResetErrors}
      />
    </div>
    {/* Images END */}

    {/* Description */}
    <TextareaElement
      errorMessages={errorMessages}
      name="description"
      onChange={value => {
        setUpdate({ description: value.length > 0 ? value : null });
      }}
      onResetErrors={onResetErrors}
      placeholder={lang.Description}
      value={company.description ?? ""}
    />
    {/* Description END */}

    {/* Website */}
    <InputElement
      autoComplete="url"
      name="website"
      onChange={value => {
        setUpdate({ website: value.length > 0 ? value : null });
      }}
      onResetErrors={onResetErrors}
      placeholder={lang.Website}
      type="url"
      value={company.website ?? ""}
    />
    {/* Website END */}

    {/* Save button */}
    <div className="flex justify-end">
      <AsyncButton
        className="primary-button"
        disabled={!modified}
        isLoading={isSubmitting}
        type="submit"
      >
        {lang.Save}
      </AsyncButton>
    </div>
    {/* Save button END */}
  </form>
);

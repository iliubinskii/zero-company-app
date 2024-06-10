import type {
  CompanyUpdate,
  ExistingCompany,
  FieldError,
  Founder
} from "../../../../schema";
import type { FC, FormEventHandler } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { COMPANY_SHARE_STEP } from "../../../../consts";
import { IoAddSharp } from "react-icons/io5";
import React from "react";
import { TableForm } from "../../../../components";
import { lang } from "../../../../langs";
import tw from "tailwind-styled-components";

export const Team: FC<Props> = ({
  company,
  errorMessages,
  modified,
  onResetErrors,
  onSave,
  setCompany
}) => {
  const addFounder = (): void => {
    setCompany({
      founders: [...company.founders, { email: "" }]
    });
  };

  const editFounder = (index: number, update: Partial<Founder>): void => {
    setCompany({
      founders: company.founders.map((founder, i) =>
        i === index ? { ...founder, ...update } : founder
      )
    });
  };

  const deleteFounder = (index: number): void => {
    setCompany({
      founders: company.founders.filter((_, i) => i !== index)
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSave}>
      <Founders>
        <List>
          <Row>
            <Grid>
              <HeadCol>{lang.Email}</HeadCol>
              <HeadCol>{lang.FirstName}</HeadCol>
              <HeadCol>{lang.LastName}</HeadCol>
              <HeadCol>{lang.Share}</HeadCol>
            </Grid>
            <ButtonsCol />
          </Row>
          {company.founders.map((founder, index) => (
            <Row key={index}>
              <Grid>
                {/* E-mail */}
                <BodyCol>
                  <TableForm.InputElement
                    autoComplete="email"
                    containerClassName="w-full"
                    errorMessages={errorMessages}
                    name={`founders[${index}].email`}
                    onChange={value => {
                      editFounder(index, { email: value });
                    }}
                    onResetErrors={onResetErrors}
                    type="email"
                    value={founder.email}
                  />
                </BodyCol>
                {/* E-mail END */}

                {/* First name */}
                <BodyCol>
                  <TableForm.InputElement
                    autoComplete="given-name"
                    containerClassName="w-full"
                    errorMessages={errorMessages}
                    name={`founders[${index}].firstName`}
                    onChange={value => {
                      editFounder(index, { firstName: value });
                    }}
                    onResetErrors={onResetErrors}
                    type="text"
                    value={founder.firstName ?? ""}
                  />
                </BodyCol>
                {/* First name END */}

                {/* Last name */}
                <BodyCol>
                  <TableForm.InputElement
                    autoComplete="family-name"
                    containerClassName="w-full"
                    errorMessages={errorMessages}
                    name={`founders[${index}].lastName`}
                    onChange={value => {
                      editFounder(index, { lastName: value });
                    }}
                    onResetErrors={onResetErrors}
                    type="text"
                    value={founder.lastName ?? ""}
                  />
                </BodyCol>
                {/* Last name END */}

                {/* Share */}
                <BodyCol>
                  <TableForm.InputElement
                    containerClassName="w-full bg-transparent"
                    errorMessages={errorMessages}
                    min={COMPANY_SHARE_STEP}
                    name={`founders[${index}].share`}
                    onChange={value => {
                      const share =
                        value.length > 0
                          ? Number.parseFloat(value)
                          : Number.NaN;

                      editFounder(index, {
                        share: Number.isNaN(share) ? null : share
                      });
                    }}
                    onResetErrors={onResetErrors}
                    step={COMPANY_SHARE_STEP}
                    type="number"
                    value={founder.share ?? ""}
                  />
                </BodyCol>
                {/* Share END */}
              </Grid>
              <ButtonsCol>
                <DeleteButton
                  onClick={() => {
                    deleteFounder(index);
                  }}
                  type="button"
                >
                  <DeleteIcon />
                </DeleteButton>
              </ButtonsCol>
            </Row>
          ))}
        </List>
        <AddButton onClick={addFounder} type="button">
          <AddIcon />
          <AddLabel>{lang.AddTeamMember}</AddLabel>
        </AddButton>
      </Founders>

      {/* Submit button */}
      <div className="flex justify-end">
        <button className="primary-button" disabled={!modified} type="submit">
          {lang.Save}
        </button>
      </div>
      {/* Submit button END */}
    </form>
  );
};

export interface Props {
  readonly company: ExistingCompany;
  readonly errorMessages: readonly FieldError[];
  readonly modified: boolean;
  readonly onResetErrors: (name?: string | undefined) => void;
  readonly onSave: FormEventHandler<HTMLFormElement>;
  readonly setCompany: (update: CompanyUpdate) => void;
}

const Founders = tw.div`rounded p-2 bg-gray-50 flex flex-col gap-1`;

const List = tw.div`bg-white border border-gray-200 divide-y divide-gray-200`;

const Row = tw.div`
  group flex px-5
  hover:bg-gray-100
  focus:bg-gray-100
  focus-within:bg-gray-100
`;

const Grid = tw.div`w-full grid grid-cols-4 gap-2`;

const HeadCol = tw.div`h-10 flex justify-center items-center font-semibold`;

const BodyCol = tw.div`h-12 flex items-center`;

const ButtonsCol = tw.div`
  w-20 flex justify-end
  opacity-0 pointer-events-none
  group-hover:opacity-100 group-hover:pointer-events-auto
  group-focus:opacity-100 group-focus:pointer-events-auto
  group-focus-within:opacity-100 group-focus-within:pointer-events-auto`;

const DeleteButton = tw.button``;

const DeleteIcon = tw(AiOutlineUserDelete)`text-xl text-gray-700`;

const AddButton = tw.button`w-full h-10 rounded-sm px-2 flex items-center gap-2`;

const AddIcon = tw(IoAddSharp)`text-lg`;

const AddLabel = tw.div`text-sm font-medium`;

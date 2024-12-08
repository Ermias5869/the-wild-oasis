import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 12rem;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({ cabinEdit = {}, onCloseModel }) {
  const { id: editId, ...editValues } = cabinEdit;

  const isEditing = Boolean(editId);
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditing ? editValues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isediting } = useEditCabin();
  const isWorking = isediting || isCreating;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditing) {
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  }
  function onError(error) {
    error;
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      TYPE={onCloseModel ? "model " : "regular"}
    >
      <FormRow Lable="cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This fild is requiered",
          })}
        />
      </FormRow>

      <FormRow Lable="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This fild is requiered",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow Lable="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This fild is requiered",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow Lable="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This fild is requiered",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        Lable="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: isEditing ? false : "This fild is requiered",
          })}
        />
      </FormRow>

      <FormRow Lable="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          type="file"
          {...register("image", {
            required: "This fild is requiered",
          })}
        />
      </FormRow>
      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button>{isEditing ? "Edit cabin" : "create new cabin"}</Button>
      </FormRow2>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinEdit: PropTypes.shape({
    id: PropTypes.number, // Unique identifier for the cabin
    name: PropTypes.string, // Name of the cabin
    location: PropTypes.string, // Location info (if relevant)
    maxCapacity: PropTypes.number, // Maximum capacity
    regularPrice: PropTypes.number, // Regular price
    discount: PropTypes.number, // Discount value
    description: PropTypes.string, // Description for the website
    image: PropTypes.oneOfType([
      PropTypes.string, // URL for an image
      PropTypes.object, // File object if editing
    ]),
  }),
  onCloseModel: PropTypes.func, // Optional function to close the form/modal
};

export default CreateCabinForm;

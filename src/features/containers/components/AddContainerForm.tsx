import {
  Form,
  FormRow,
  FormInput,
  FormTextArea,
  Button,
} from '@/components/shared';
import { useForm } from 'react-hook-form';
import {
  type RawNewDataContainerWithImageFile,
  type DataContainer,
} from '@/services/api/containers.types';
import {
  useCreateContainer,
  useEditContainer,
} from '@/features/containers/hooks';

type FormFields = {
  name: string;
  maxCapacity: number | '';
  regularPrice: number | '';
  discount: number | '';
  description: string;
  image: FileList | null;
};

type AddContainerFormProps = {
  container?: DataContainer;
  onCloseModal?: () => void;
};

export function AddContainerForm({
  container,
  onCloseModal,
}: AddContainerFormProps) {
  const { isAdding, mutateAddNewContainer } = useCreateContainer();
  const { isEditing, mutateEditContainer } = useEditContainer();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      name: container?.name ?? '',
      maxCapacity: container?.maxCapacity ?? '',
      regularPrice: container?.regularPrice ?? '',
      discount: container?.discount ?? 0,
      description: container?.description ?? '',
      image: null,
    },
  });

  function getConvertedNumberValue(value: number | string): number | null {
    const convertedValue = Number(value);
    return Number.isNaN(convertedValue) ? null : convertedValue;
  }

  function getConvertedContainerData(
    data: FormFields,
  ): RawNewDataContainerWithImageFile {
    return {
      name: data.name,
      max_capacity: getConvertedNumberValue(data.maxCapacity),
      regular_price: getConvertedNumberValue(data.regularPrice),
      discount: getConvertedNumberValue(data.discount),
      description: data.description,
      image: data.image?.[0] ?? null,
    };
  }

  function onSubmit(data: FormFields) {
    const containerData = getConvertedContainerData(data);
    if (container?.id) {
      mutateEditContainer(
        {
          newContainerData: containerData,
          id: container.id,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      mutateAddNewContainer(containerData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} modal={!!onCloseModal}>
      <FormRow error={errors?.name?.message}>
        <FormInput
          id="name"
          label="Container Name *"
          {...register('name', {
            required: 'Container name is required',
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.maxCapacity?.message}>
        <FormInput
          type="number"
          id="maxCapacity"
          label="Maximum Capacity *"
          step="1"
          {...register('maxCapacity', {
            required: 'Capacity is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.regularPrice?.message}>
        <FormInput
          type="number"
          id="regularPrice"
          label="Regular Price *"
          {...register('regularPrice', {
            required: 'Regular price is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.discount?.message}>
        <FormInput
          type="number"
          id="discount"
          label="Discount *"
          {...register('discount', {
            required: 'Discount is required',
            validate: (value) =>
              Number(value) < Number(getValues('regularPrice')) ||
              'Discount should be less than regular price',
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.description?.message}>
        <FormTextArea
          id="description"
          label="Description For Website"
          {...register('description')}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.image?.message}>
        <FormInput
          type="file"
          id="image"
          accept="image/*"
          label="Container Photo"
          {...register('image')}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow>
        <Button
          color="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isAdding || isEditing}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isAdding || isEditing}>
          {container ? 'Edit Container' : 'Add Container'}
        </Button>
      </FormRow>
    </Form>
  );
}

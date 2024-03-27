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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
          label={t('label.forms.addContainer.containerName')}
          {...register('name', {
            required: t(
              'label.forms.addContainer.errors.containerName.required',
            ),
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.maxCapacity?.message}>
        <FormInput
          type="number"
          id="maxCapacity"
          label={t('label.forms.addContainer.maxCapacity')}
          step="1"
          {...register('maxCapacity', {
            required: t('label.forms.addContainer.errors.maxCapacity.required'),
            min: {
              value: 1,
              message: t('label.forms.addContainer.errors.maxCapacity.min'),
            },
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.regularPrice?.message}>
        <FormInput
          type="number"
          id="regularPrice"
          label={t('label.forms.addContainer.regularPrice')}
          {...register('regularPrice', {
            required: t(
              'label.forms.addContainer.errors.regularPrice.required',
            ),
            min: {
              value: 1,
              message: t('label.forms.addContainer.errors.regularPrice.min'),
            },
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.discount?.message}>
        <FormInput
          type="number"
          id="discount"
          label={t('label.forms.addContainer.discount')}
          {...register('discount', {
            required: t(
              'label.forms.addContainer.errors.discount.required',
            ),
            validate: (value) =>
              Number(value) < Number(getValues('regularPrice')) ||
              t(
                'label.forms.addContainer.errors.discount.must',
              ),
          })}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.description?.message}>
        <FormTextArea
          id="description"
          label={t('label.forms.addContainer.description')}
          {...register('description')}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow error={errors?.image?.message}>
        <FormInput
          type="file"
          id="image"
          accept="image/*"
          label={t('label.forms.addContainer.image')}
          {...register('image')}
          disabled={isAdding || isEditing}
        />
      </FormRow>
      <FormRow className="mt-4 md:mt-1 lg:mt-2">
        <Button
          color="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isAdding || isEditing}
        >
          {t('action.cancel')}
        </Button>
        <Button type="submit" disabled={isAdding || isEditing}>
          {container ? t('action.edit') : t('action.add')}
        </Button>
      </FormRow>
    </Form>
  );
}

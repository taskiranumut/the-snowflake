import Form from '@/components/shared/Form';
import FormRow from '@/components/shared/FormRow';
import FormInput from '@/components/shared/FormInput';
import FormTextArea from '@/components/shared/FormTextarea';
import Button from '@/components/shared/Button';
import { useForm } from 'react-hook-form';
import { addNewContainer } from '@/services/api';
import { type RawNewDataContainer } from '@/services/api/containers.types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type FormFields = {
  name: string;
  maxCapacity: number | '';
  regularPrice: number | '';
  discount: number | '';
  description: string;
  image: string | null;
};

function AddContainerForm() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: addNewContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['containers'],
      });
      toast.success('Container successfully added!');
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      name: '',
      maxCapacity: '',
      regularPrice: '',
      discount: 0,
      description: '',
      image: null,
    },
  });

  function getConvertedNumberValue(value: number | string): number | null {
    const convertedValue = Number(value);
    return Number.isNaN(convertedValue) ? null : convertedValue;
  }

  function getConvertedContainerData(data: FormFields): RawNewDataContainer {
    return {
      name: data.name,
      max_capacity: getConvertedNumberValue(data.maxCapacity),
      regular_price: getConvertedNumberValue(data.regularPrice),
      discount: getConvertedNumberValue(data.discount),
      description: data.description,
      image: '',
    };
  }

  function onSubmit(data: FormFields) {
    const newContainerData = getConvertedContainerData(data);

    console.log('newData :>> ', newContainerData);
    console.log('data :>> ', data);
    mutate(newContainerData);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <FormInput id="name" label="Container Name" {...register('name')} />
      </FormRow>
      <FormRow>
        <FormInput
          type="number"
          id="maxCapacity"
          label="Maximum Capacity"
          {...register('maxCapacity')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          type="number"
          id="regularPrice"
          label="Regular Price"
          {...register('regularPrice')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          type="number"
          id="discount"
          label="Discount"
          {...register('discount')}
        />
      </FormRow>
      <FormRow>
        <FormTextArea
          id="description"
          label="Description For Website"
          {...register('description')}
        />
      </FormRow>
      <FormRow>
        <FormInput
          type="file"
          id="image"
          accept="image/*"
          label="Container Photo"
          {...register('image')}
        />
      </FormRow>
      <FormRow>
        <Button color="secondary" type="reset" disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Add Container
        </Button>
      </FormRow>
    </Form>
  );
}

export default AddContainerForm;

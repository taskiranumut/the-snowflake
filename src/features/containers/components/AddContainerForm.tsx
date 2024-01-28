import Form from '@/components/shared/Form';
import FormRow from '@/components/shared/FormRow';
import FormInput from '@/components/shared/FormInput';
import FormTextArea from '@/components/shared/FormTextarea';
import Button from '@/components/shared/Button';
import { useForm } from 'react-hook-form';

type FormFields = {
  name: string;
  maxCapacity: number | '';
  regularPrice: number | '';
  discount: number | '';
  description: string;
  image: File | null;
};

function AddContainerForm() {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: '',
      maxCapacity: '',
      regularPrice: '',
      discount: 0,
      description: '',
      image: null,
    },
  });

  function onSubmit(data: FormFields) {
    console.log('data :>> ', data);
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
        <Button color="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">Add Container</Button>
      </FormRow>
    </Form>
  );
}

export default AddContainerForm;

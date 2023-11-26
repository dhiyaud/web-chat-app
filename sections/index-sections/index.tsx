import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkUserExists, createUser } from '@lib/fetcher/user';
import { saveUserData } from '@lib/localStorage/user';
import AuthInput from '@sections/index-sections/IndexComponents/AuthInput';
import Spinner from '@components/Spinner';

import type { SubmitHandler } from 'react-hook-form';

const validationSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(5, { message: 'Username must be 5-15 characters long' })
    .max(15, { message: 'Username must be 5-15 characters long' })
    .regex(/^[A-Za-z0-9_-]+$/gi, {
      message: 'Only alphanumeric and characters ( _ , - ) are allowed',
    }),
  roomId: z
    .string({
      required_error: 'Room ID is required',
      invalid_type_error: 'Room ID must be a string',
    })
    .min(5, { message: 'Room ID must be 5-15 characters long' })
    .max(15, { message: 'Room ID must be 5-15 characters long' })
    .regex(/^[A-Za-z0-9_-]+$/gi, {
      message: 'Only alphanumeric and characters ( _ , - ) are allowed',
    }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const IndexSections: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      clearErrors();
      setIsLoading(true);
      const checkResponse = await checkUserExists(data.username);
      if (checkResponse.message) {
        setError('username', {
          type: 'custom',
          message: 'Username is already taken',
        });
        return;
      }
      const createResponse = await createUser(data);
      saveUserData(createResponse);
      router.push('/chat');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Unknown Error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <AuthInput
          id='username'
          name='username'
          type='text'
          placeholder='Username'
          register={register}
          errors={errors.username?.message}
          disabled={isLoading}
        />
        <AuthInput
          id='roomId'
          name='roomId'
          type='text'
          placeholder='Room ID'
          register={register}
          errors={errors.roomId?.message}
          disabled={isLoading}
        />
      </div>
      <div className='mt-24'>
        <button
          type='submit'
          className='w-full text-white bg-primary rounded-full py-3 hover:bg-primary/90 hover:shadow-md disabled:bg-primary/75 disabled:shadow-none'
          disabled={isLoading}
        >
          <div className='flex flex-1 items-center justify-center'>
            {isLoading && (
              <div className='w-5 h-5 mr-2'>
                <Spinner />
              </div>
            )}
            <span className='font-medium'>JOIN</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default IndexSections;

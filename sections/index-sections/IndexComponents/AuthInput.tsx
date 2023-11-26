import clsx from 'clsx';

import type { UseFormRegister } from 'react-hook-form';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>;
  errors?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  register,
  name,
  errors,
  ...props
}) => {
  return (
    <div className='w-full'>
      <input
        className={clsx(
          'appearance-none block w-full bg-secondary text-gray-700 border rounded-lg py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white',
          errors ? 'border-red-500' : 'border-gray-300'
        )}
        {...register(name)}
        {...props}
      />
      {errors && <p className='text-red-500 text-xs italic'>{errors}</p>}
    </div>
  );
};

export default AuthInput;

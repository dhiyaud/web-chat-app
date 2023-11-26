import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const NotConnected: React.FC = () => {
  return (
    <div className='flex flex-col items-center px-6 py-10 gap-3'>
      <ExclamationTriangleIcon className='h-12 w-12 text-red-600' />
      <div className='text-base'>
        You are NOT connected to MongoDB. Check the <code>README.md</code> for
        instructions.
      </div>
    </div>
  );
};

export default NotConnected;

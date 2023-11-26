import { useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSubmit: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSubmit, ...props }) => {
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (!message) return;
    handleSubmit(message);
    setMessage('');
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-row relative'>
        <input
          className='appearance-none block w-full bg-secondary text-base text-gray-700 border rounded-full p-4 pr-14 mb-1 leading-tight focus:outline-none focus:bg-white'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onInputKeyDown}
          {...props}
        />
        <span className='flex absolute top-2 right-2'>
          <button
            type='submit'
            className='bg-primary rounded-full p-1 transition duration-150 hover:bg-primary/75 sm:top-1.5'
            onClick={sendMessage}
          >
            <ArrowUpIcon className='h-7 w-7 text-white' />
          </button>
        </span>
      </div>
    </div>
  );
};

export default ChatInput;

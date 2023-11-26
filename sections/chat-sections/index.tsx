import { useEffect, useRef } from 'react';
import ChatInput from '@sections/chat-sections/ChatComponents/ChatInput';

import type { MessagesType } from '@pages/chat';
import type { UserData } from '@lib/fetcher/user';

interface ChatSectionsProps {
  userData: UserData | null;
  messages: MessagesType[];
  onSendMessage: (message: string) => void;
}

const ChatSections: React.FC<ChatSectionsProps> = ({
  userData,
  messages,
  onSendMessage,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length && ref.current) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight;
      ref.current.scrollTo({ top: offsetBottom });
    }
  }, [messages]);

  const isCurrentUser = (username: string) => {
    return userData?.username === username || false;
  };

  return (
    <>
      <div
        ref={ref}
        className='h-full flex-1 flex-grow overflow-y-auto scroll-smooth px-2 py-2 my-4'
      >
        {messages.map((item, index) => (
          <div
            key={index}
            className={`w-9/12 ${
              isCurrentUser(item.username) && 'ml-auto mr-0'
            }`}
          >
            {!isCurrentUser(item.username) && <span>{item.username}</span>}
            <div className='flex items-center mb-5'>
              <div
                className={`flex-1 p-2 rounded-lg mb-2 relative ${
                  isCurrentUser(item.username)
                    ? 'text-white bg-primary'
                    : 'text-black bg-secondary'
                }`}
              >
                <div>{item.message}</div>
                <div
                  className={`absolute overflow-hidden inline-block ${
                    isCurrentUser(item.username)
                      ? 'right-0 w-5'
                      : 'left-0 w-5 -mt-1.5'
                  }`}
                >
                  <div
                    className={`h-10 transform origin-top-left ${
                      isCurrentUser(item.username)
                        ? 'bg-primary -rotate-45'
                        : 'bg-secondary rotate-45'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <ChatInput
          type='text'
          id='message'
          name='message'
          placeholder='Message here...'
          handleSubmit={onSendMessage}
        />
      </div>
    </>
  );
};

export default ChatSections;

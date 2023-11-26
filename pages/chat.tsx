import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { deleteUserData, getUserData } from '@lib/localStorage/user';
import { deleteUser } from '@lib/fetcher/user';
import io from 'socket.io-client';
import Head from 'next/head';
import Layout from '@components/Layout';
import ChatSections from '@sections/chat-sections';

import type { Socket } from 'socket.io-client';
import type { UserData } from '@lib/fetcher/user';

export interface MessagesType {
  username: string;
  roomId: string;
  message: string;
}

const Chat = () => {
  const socketIo = useRef<null | Socket>(null);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<MessagesType[]>([]);

  const router = useRouter();

  const initializeSocket = useCallback(async () => {
    if (!socketIo.current && userData) {
      try {
        await fetch('/api/socket');
        socketIo.current = io({
          transports: ['websocket'],
        });

        socketIo.current.emit('create', userData.roomId);

        socketIo.current.emit('get-messages', userData.roomId);

        socketIo.current.on('connect', () => {
          console.warn('Socket connected');
        });

        socketIo.current.on('connect_error', () => {
          toast.error('Error connecting to the server, please try again');
        });

        socketIo.current.on('disconnect', () => console.warn('Disconnected'));

        socketIo.current.on('list-messages', (msg) => {
          setMessages(msg);
        });

        socketIo.current.on('update-message', (msg) => {
          setMessages((prevState) => [...prevState, msg]);
        });

        socketIo.current.on('error-message', (msg) => {
          console.warn('error-message', msg);
          toast.error(msg);
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error('Unknown Error');
        }
      }
    }
  }, [userData]);

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (socketIo.current) {
        socketIo.current.disconnect();
        socketIo.current = null;
      }
    };
  }, []);

  const onSendMessage = (message: string) => {
    if (socketIo.current && userData)
      socketIo.current.emit('send-message', {
        username: userData.username,
        roomId: userData.roomId,
        message: message,
      });
  };

  const onExit = async () => {
    try {
      const { username } = getUserData();
      await deleteUser(username);
      deleteUserData();
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Unknown Error');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Chatroom</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='h-full flex flex-col justify-between'>
          <div className='relative'>
            <p className='absolute w-full text-center text-3xl font-bold'>
              {userData?.roomId || '-'}
            </p>
            <div className='absolute left-0 translate-y-1/4'>
              <button
                type='button'
                className='text-primary text-base hover:text-primary/75 hover:underline'
                onClick={onExit}
              >
                Exit
              </button>
            </div>
          </div>
          <div className='flex flex-col overflow-hidden mt-8 h-full'>
            <ChatSections
              userData={userData}
              messages={messages}
              onSendMessage={onSendMessage}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Chat;

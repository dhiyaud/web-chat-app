import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '@lib/localStorage/user';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      router.push('/chat');
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div className='min-h-screen max-w-xl container mx-auto'>
      <div className='h-screen flex flex-col flex-1 py-8 px-4'>{children}</div>
    </div>
  );
};

export default Layout;

import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import Layout from '@components/Layout';
import NotConnected from '@components/NotConnected';
import IndexSections from '@sections/index-sections';

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from 'next';

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

const Login: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ isConnected }) => {
  if (!isConnected) return <NotConnected />;

  return (
    <>
      <Head>
        <title>Join Chatroom</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='mx-auto mt-8'>
          <h1 className='text-3xl font-bold'>Join Chatroom</h1>
        </div>
        <div className='mt-8'>
          <IndexSections />
        </div>
      </Layout>
    </>
  );
};

export default Login;

import nc from 'next-connect';
import clientPromise from '@lib/mongodb';
import { MongoServerError } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const { value } = req.query;

    const client = await clientPromise;
    const db = client.db('chat_app');

    const users = await db.collection('users').findOne({
      username: value,
    });

    return res.json({ message: !!users });
  } catch (err) {
    if (err instanceof MongoServerError) {
      return res.status(err.code as number).json(err.message);
    } else {
      return res.status(500).json(err);
    }
  }
});

export default handler;

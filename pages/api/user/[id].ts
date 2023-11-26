import nc from 'next-connect';
import clientPromise from '@lib/mongodb';
import { MongoServerError } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().delete(
  async (req, res) => {
    try {
      const { id } = req.query;

      const client = await clientPromise;
      const db = client.db('chat_app');

      const del = await db.collection('users').deleteOne({
        username: id,
      });
      return res.json(del);
    } catch (err) {
      if (err instanceof MongoServerError) {
        return res.status(err.code as number).json(err.message);
      } else {
        return res.status(500).json(err);
      }
    }
  }
);

export default handler;

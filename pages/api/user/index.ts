import nc from 'next-connect';
import clientPromise from '@lib/mongodb';
import { MongoServerError } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('chat_app');

    const { username, roomId } = req.body;
    await db.collection('users').insertOne({
      username,
    });
    await db
      .collection('rooms')
      .updateOne(
        { roomId: roomId },
        { $setOnInsert: { roomId } },
        { upsert: true }
      );
    return res.json(req.body);
  } catch (err) {
    if (err instanceof MongoServerError) {
      return res.status(err.code as number).json(err.message);
    } else {
      return res.status(500).json(err);
    }
  }
});

export default handler;

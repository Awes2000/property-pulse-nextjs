'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

async function addMessage(previousState, formData) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'You must be logged in to send a message' };
  }

  const { user } = session;

  const recipient = formData.get('recipient');

  if (user.id === recipient) {
    return { error: 'You cannot send a message to yourself' };
  }

  const newMessage = new Message({
    sender: user.id,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;

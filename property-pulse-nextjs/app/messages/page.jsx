import connectDB from '@/config/database';
import Message from '@/models/Message';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import MessageCard from '@/components/Message';

const MessagesPage = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <section className='bg-blue-50'>
        <div className='container m-auto py-24 max-w-6xl'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
            <p>You must be logged in to view messages</p>
          </div>
        </div>
      </section>
    );
  }

  const { user } = session;

  // Get user's messages from database
  const readMessages = await Message.find({ recipient: user.id, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({
    recipient: user.id,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;

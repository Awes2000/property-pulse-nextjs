import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export async function GET(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = session;

    const count = await Message.countDocuments({
      recipient: user.id,
      read: false,
    });

    return new Response(JSON.stringify({ count }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

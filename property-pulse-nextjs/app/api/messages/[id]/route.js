import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id (Mark as read/unread)
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = session;

    const message = await Message.findById(id);

    if (!message) return new Response('Message Not Found', { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Update message to read/unread depending on the current status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify({ read: message.read }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

// DELETE /api/messages/:id
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = session;

    const message = await Message.findById(id);

    if (!message) return new Response('Message Not Found', { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await message.deleteOne();

    return new Response('Message Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

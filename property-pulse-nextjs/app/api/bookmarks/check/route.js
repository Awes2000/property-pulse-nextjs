import connectDB from '@/config/database';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const dynamic = 'force-dynamic';

// POST /api/bookmarks/check
export async function POST(request) {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = session;

    // Find user in database
    const dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      return new Response('User not found', { status: 404 });
    }

    // Check if property is bookmarked
    let isBookmarked = dbUser.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

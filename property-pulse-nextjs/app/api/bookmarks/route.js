import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const dynamic = 'force-dynamic';

// POST /api/bookmarks
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

    // Check if property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response('Property not found', { status: 404 });
    }

    // Check if property is already bookmarked
    let isBookmarked = dbUser.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      dbUser.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      dbUser.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    await dbUser.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}

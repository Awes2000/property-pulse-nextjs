import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

const SavedPropertiesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Saved Properties</h1>
          <p>You must be signed in to view your saved properties</p>
        </div>
      </section>
    );
  }

  const { user } = session;

  await connectDB();

  // Get user with populated bookmarks
  const dbUser = await User.findOne({ email: user.email }).populate('bookmarks');

  if (!dbUser) {
    return (
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Saved Properties</h1>
          <p>User not found</p>
        </div>
      </section>
    );
  }

  const bookmarkedProperties = dbUser.bookmarks;

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarkedProperties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarkedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

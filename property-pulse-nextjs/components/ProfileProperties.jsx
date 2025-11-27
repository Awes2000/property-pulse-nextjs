'use client';
import Image from 'next/image';
import Link from 'next/link';
import deleteProperty from '@/app/actions/deleteProperty';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  // Helper function to get correct image URL
  const getImageUrl = (image) => {
    return image.startsWith('http') ? image : `/properties/${image}`;
  };

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = confirm('Are you sure you want to delete this property?');

    if (!confirmed) return;

    try {
      await deleteProperty(propertyId);

      const updatedProperties = properties.filter(
        (property) => property._id !== propertyId
      );

      setProperties(updatedProperties);

      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  return (
    <div className="md:w-3/4 md:pl-4">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
      {properties.length === 0 ? (
        <p>You have no property listings</p>
      ) : (
        properties.map((property) => (
          <div key={property._id} className="mb-10">
            <Link href={`/properties/${property._id}`}>
              {property.images && property.images.length > 0 && property.images[0].startsWith('http') && (
                <Image
                  className="h-32 w-full rounded-md object-cover"
                  src={property.images[0]}
                  alt={property.name}
                  width={500}
                  height={100}
                />
              )}
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.name}</p>
              <p className="text-gray-600">
                Address: {property.location.street} {property.location.city}, {property.location.state}
              </p>
            </div>
            <div className="mt-2">
              <Link href={`/properties/${property._id}/edit`}>
                <button className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600 cursor-pointer">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                type="button"
                onClick={() => handleDeleteProperty(property._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileProperties;

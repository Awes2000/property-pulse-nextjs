'use client';
import {
  FaFacebook,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  const handleShare = (platform) => {
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=Check out this property: ${property.name}`;
        break;
      case 'email':
        url = `mailto:?subject=Check out this property&body=Check out this property: ${shareUrl}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold text-center pt-2 mb-4'>
        Share This Property
      </h3>
      <div className='flex gap-3 justify-center pb-4'>
        <button
          onClick={() => handleShare('facebook')}
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        >
          <FaFacebook className='mr-2' /> Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className='bg-blue-400 hover:bg-blue-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        >
          <FaTwitter className='mr-2' /> Twitter
        </button>
        <button
          onClick={() => handleShare('email')}
          className='bg-gray-700 hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        >
          <FaEnvelope className='mr-2' /> Email
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;

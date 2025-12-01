'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const PropertyImages = ({ images }) => {
  // Helper function to get correct image URL
  const getImageUrl = (image) => {
    return image.startsWith('http') ? image : `/properties/${image}`;
  };

  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item
              original={getImageUrl(images[0])}
              thumbnail={getImageUrl(images[0])}
              width='1800'
              height='400'
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={getImageUrl(images[0])}
                  alt=''
                  className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }`}
                >
                  <Item
                    original={getImageUrl(image)}
                    thumbnail={getImageUrl(image)}
                    width='1800'
                    height='400'
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={getImageUrl(image)}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;

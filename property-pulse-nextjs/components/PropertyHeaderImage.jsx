import Image from "next/image";

const PropertyHeaderImage = ({image}) => {
    // Check if image is a full URL or local path
    const imageUrl = image.startsWith('http')
        ? image
        : `/properties/${image}`;

    return (
         <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={imageUrl}
            alt=""
            className="object-cover h-[400px] w-full"
            width={1280}
            height={720}
            sizes='100vw'
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
    );
}
 
export default PropertyHeaderImage;
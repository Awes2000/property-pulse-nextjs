import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import {FaArrowLeft} from 'react-icons/fa';
import { convertToSerializableObject } from "@/utils/convertToObject";


const PropertyPage = async ({params}) => {
    await connectDB();
    const { id } = await params;
    const property = await Property.findById(id).lean();

    if (!property) {
        return <div>Property not found</div>;
    }

    // Convert the property document to a plain object
    const propertyObj = convertToSerializableObject(property);

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <PropertyImages images={property.images} />
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2"/> Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
                        <div className="md:col-span-2">
                            <PropertyDetails property={property} />
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-4">
                            <BookmarkButton property={propertyObj} />
                            <ShareButtons property={propertyObj} />
                            <PropertyContactForm property={propertyObj} />
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};
 
export default PropertyPage;
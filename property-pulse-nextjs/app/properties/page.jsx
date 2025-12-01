
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/Property';


const PropertiesPage = async ({ searchParams }) => {
    await connectDB();

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 9;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

    return (
        <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (<p>No Properties found</p>) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {
                properties.map((property) =>(
                   <PropertyCard key={property._id} property={property} />
                ))
            }
          </div>
        ) }
        <Pagination page={page} pageSize={pageSize} totalItems={total} />
        </div>
        </section>
    );
}
 
export default PropertiesPage;
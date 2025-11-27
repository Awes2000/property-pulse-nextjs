import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Property from '../models/Property.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const properties = JSON.parse(readFileSync(join(__dirname, '../properties.json'), 'utf-8'));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing properties
        await Property.deleteMany({});
        console.log('Cleared existing properties');

        // Create a dummy owner ID (you can change this later)
        const dummyOwnerId = new mongoose.Types.ObjectId();

        // Transform and insert properties
        const transformedProperties = properties.map(prop => {
            const { _id, owner, ...rest } = prop;
            return {
                ...rest,
                owner: dummyOwnerId
            };
        });

        const insertedProperties = await Property.insertMany(transformedProperties);
        console.log(`Seeded ${insertedProperties.length} properties`);

        // Log the IDs so you can use them
        console.log('\nProperty IDs:');
        insertedProperties.forEach((prop, index) => {
            console.log(`${index + 1}. ${prop.name}: ${prop._id}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
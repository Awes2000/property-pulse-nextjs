import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';

export const metadata = {
    title: 'Property Pulse',
    keywords: 'rental, property, real estate',
    description: 'Find the perfect rental property',
}

const MainLayout = ({children}) => {
    return (
        <AuthProvider>
            <html lang="en">
                <body>
                    <Navbar/>
                    <main>{children}</main>
                    <Footer/>
                    <ToastContainer />
                </body>
            </html>
        </AuthProvider>
    );
}
 
export default MainLayout;
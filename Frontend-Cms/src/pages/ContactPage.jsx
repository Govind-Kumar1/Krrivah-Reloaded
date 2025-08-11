import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Sahi path dein
import ManageContacts from '../components/contactComponents/ManageContacts'; // Sahi path dein

const ContactPage = () => {
    // Contact page ke liye breadcrumbs
    const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Contact" }
    ];

    return (
        // AdminLayout ko use karein aur breadcrumbs pass karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Page ka content (ManageContacts table) yahan ayega */}
            <ManageContacts />
        </AdminLayout>
    );
};

export default ContactPage;
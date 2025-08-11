import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Sahi path dein
import DashboardContent from '../components/DashboardContent'; // Sahi path dein

const DashboardPage = () => {
    // Dashboard page ke liye breadcrumbs
    const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Dashboard" }
    ];

    return (
        // AdminLayout ko use karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Page ka content (Dashboard cards) yahan ayega */}
            <DashboardContent />
        </AdminLayout>
    );
};

export default DashboardPage;
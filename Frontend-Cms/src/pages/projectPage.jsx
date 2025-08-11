import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Sahi path dein
import ManageProjects from "../components/projectComponents/ManageProjects"; // Sahi path dein

const ProjectPage = () => {
  const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Projects" }
    ];

    return (
        // AdminLayout ko use karein aur breadcrumbs pass karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Beech mein page ka content daal dein */}
            <ManageProjects />
        </AdminLayout>
    );
};

export default ProjectPage;
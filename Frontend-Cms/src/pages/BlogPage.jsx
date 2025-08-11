import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Layout component import karein
import ManageBlogs from '../components/blogComponents/ManageBlogs'; // Blog ka content import karein

const BlogPage = () => {
    // Is page ke liye breadcrumbs define karein
    const breadcrumbs = [
        { name: "Home", link: "/admin" },
        { name: "Blogs" }
    ];

    return (
        // AdminLayout ko use karein aur breadcrumbs pass karein
        <AdminLayout breadcrumbs={breadcrumbs}>
            {/* Beech mein page ka content daal dein */}
            <ManageBlogs />
        </AdminLayout>
    );
};

export default BlogPage;
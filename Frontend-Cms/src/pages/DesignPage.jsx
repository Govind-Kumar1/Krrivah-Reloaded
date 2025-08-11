import React from 'react';
import AdminLayout from '../components/AdminLayout';
import ManageDesigns from '../components/designComponents/ManageDesigns';

const DesignPage = () => {
  const breadcrumbs = [
    { name: "Home", link: "/admin" },
    { name: "Design" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <ManageDesigns />
    </AdminLayout>
  );
};

export default DesignPage;
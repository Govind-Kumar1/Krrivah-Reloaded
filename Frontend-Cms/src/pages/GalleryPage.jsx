import React from "react";
import AdminLayout from "../components/AdminLayout"; // Layout component import karein
import ManageGallery from "../components/galleryComponents/ManageGallery";

const GalleryPage = () => {
  // Is page ke liye breadcrumbs define karein
  const breadcrumbs = [{ name: "Home", link: "/admin" }, { name: "Gallery" }];

  return (
    // AdminLayout ko use karein aur breadcrumbs pass karein
    <AdminLayout breadcrumbs={breadcrumbs}>
      {/* Beech mein page ka content daal dein */}
      <ManageGallery/>
    </AdminLayout>
  );
};

export default GalleryPage;

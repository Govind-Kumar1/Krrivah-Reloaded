import React from "react";
import AdminLayout from "../components/AdminLayout"; // Layout component import karein
import ManageBanners from "../components/bannerComponents/ManageBanners";

const BannerPage = () => {
  // Is page ke liye breadcrumbs define karein
  const breadcrumbs = [{ name: "Home", link: "/admin" }, { name: "Banner" }];

  return (
    // AdminLayout ko use karein aur breadcrumbs pass karein
    <AdminLayout breadcrumbs={breadcrumbs}>
      {/* Beech mein page ka content daal dein */}
      <ManageBanners/>
    </AdminLayout>
  );
};

export default BannerPage;

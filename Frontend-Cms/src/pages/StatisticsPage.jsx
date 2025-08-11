import React from "react";
import AdminLayout from "../components/AdminLayout"; // Layout component import karein
import ManageStatistics from "../components/statisticsComponents/ManageStatistics";

const StatisticsPage = () => {
  // Is page ke liye breadcrumbs define karein
  const breadcrumbs = [{ name: "Home", link: "/admin" }, { name: "Stats" }];

  return (
    // AdminLayout ko use karein aur breadcrumbs pass karein
    <AdminLayout breadcrumbs={breadcrumbs}>
      {/* Beech mein page ka content daal dein */}
      <ManageStatistics />
    </AdminLayout>
  );
};

export default StatisticsPage;

"use client";
import { useEffect } from "react";

// components
import TableComponent from "@/components/Admin/tables/CategoriesAndBrandsTable/TableComponent";

// store
import { useBannerStore } from "@/store/store";

const BannerListScreen = () => {
  const { banners, fetchBanners, deleteBanner } = useBannerStore(
    (state) => state
  );

  useEffect(() => {
    fetchBanners();
  }, []);

  if (banners)
    return (
      <TableComponent
        data={banners}
        deleteRow={deleteBanner}
        title="بنرها"
        url="/admin/add-banner"
        linkRouter="/admin/edit-banner"
      />
    );
};

export default BannerListScreen;

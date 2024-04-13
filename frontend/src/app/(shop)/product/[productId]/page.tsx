"use client";

import ProductList from "@/components/Home/ProductList/ProductList";
import PageHero from "@/components/PageHero";
import FirstSection from "@/components/ProductDetail/FirstSection/FirstSection";
import SecondSection from "@/components/ProductDetail/SecondSection/SecondSection";
import ThirdSection from "@/components/ProductDetail/ThirdSection/main/ThirdSection";
import "./product-detail.css";
import ProductDetailScreen from "@/screens/ProductDetailPage/ProductDetailScreen";
import Image from "next/image";
import { En_To_Fa } from "@/utils/functions";
import AddCommentForm from "@/components/ProductDetail/Modals/AddCommentForm";
import {
  useModal,
  useProductStore,
  useStore,
} from "@/store/store";
import { RefObject, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ShareModal from "@/components/ProductDetail/Modals/ShareModal";

const ProductDetailPage = () => {
  // store
  const { showAddCommentModal, showShareModal } = useModal((state) => state);
  const { product, fetchProduct, products, fetchProducts } = useProductStore(
    (state) => state
  );
  const { setActiveIndex, setActiveTab } = useStore();

  // Refs
  const specificationsRef = useRef<HTMLElement>(null);
  const commentsRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLElement>(null);

  // useParams
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct(productId.toString());
    setActiveIndex(0);
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // handle Active Tab
  const scrollToSection = (elementRef: RefObject<HTMLElement>) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 185,
        behavior: "smooth",
      });
      setActiveTab(elementRef.current.id);
    }
  };

  if (!product) {
    return <div>محصولی با این مشخصات پیدا نشد</div>;
  }

  return (
    <div>
      <section className="hidden lg:flex flex-col gap-10 p-5 text-xs lg:text-sm bg-[#FCFEFF]">
        {/* Page Hero  */}
        <PageHero />

        <FirstSection
          commentsRef={commentsRef}
          scrollToSection={scrollToSection}
          product={product}
        />

        <SecondSection />

        <ThirdSection
          specificationsRef={specificationsRef}
          commentsRef={commentsRef}
          borderRef={borderRef}
          scrollToSection={scrollToSection}
          product={product}
        />

        <ProductList products={products} />
      </section>

      {/* Product Detail Mobile Screen  */}
      <ProductDetailScreen
        product={product}
        commentsRef={commentsRef}
        scrollToSection={scrollToSection}
      />

      {/* Send Prdouct And Delivery Options  */}
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-around my-10 px-3">
        <div className="flex items-center gap-3">
          <Image
            src="/images/static_chain-store.svg"
            alt="chain-store"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base whitespace-nowrap">
              ارسال سریع در تهران و خارج از تهران
            </span>
            <span className="text-xs">تحویل سریع به مشتریان</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/static_support.svg"
            alt="support-store"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base whitespace-nowrap">
              مشاوره و پشتیبانی
            </span>
            <span className="text-xs">{En_To_Fa("7")} روز هفته</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/static_fast-delivery.svg"
            alt="fast-delivery"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base whitespace-nowrap">
              فروشگاه های زنجیره ای
            </span>
            <span className="text-xs">
              در بازار موبایل {En_To_Fa("1")}، بازار موبایل {En_To_Fa("2")}، عرش
              آجودانیه، کوروش، اپال و مطهری
            </span>
          </div>
        </div>
      </div>
      {showAddCommentModal && <AddCommentForm product={product} />}
      {showShareModal && <ShareModal />}
    </div>
  );
};

export default ProductDetailPage;

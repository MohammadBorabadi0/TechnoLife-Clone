import { useState } from "react";

// icons 
import { BiChevronDown, BiChevronUp } from "react-icons/bi";


const ProductSpecifications = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='flex-1'>
            <div className='flex flex-col gap-5 text-xs md:text-sm lg:text-base'>


                {/* Product Technical Specifications  */}
                <div className='flex items-center gap-3 p-4'>
                    <span className='w-2 h-2 rounded-full bg-yellow-600 block'></span>
                    <h4 className='text-xl font-semibold text-black'>مشخصات فنی</h4>
                </div>

                <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                    <p className='font-semibold text-black'>نوع پردازنده - CPU :</p>
                    <p>Apple A15 Bionic (5 nm)</p>
                </div>

                <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                    <p className='font-semibold text-black'>تعداد هسته پردازشگر :</p>
                    <p>شش هسته</p>
                </div>

                <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                    <p className='font-semibold text-black'>پردازنده گرافیکی - GPU :</p>
                    <p>Apple GPU (4-Core Graphics)</p>
                </div>

                <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                    <p className='font-semibold text-black'>تعداد سیم کارت :</p>
                    <p>دو سیم کارت نانو سیم (همزمان فعال)</p>
                </div>

                <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                    <p className='font-semibold text-black'>کیفیت دوربین :</p>
                    <p>دوگانه 12 مگاپیکسل + 12 مگاپیکسل</p>
                </div>

                {showMore && (
                    <>
                        <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                            <p className='font-semibold text-black'>نوع صفحه نمایش :</p>
                            <p>Super Retina XDR OLED</p>
                        </div>

                        <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                            <p className='font-semibold text-black'>ظرفیت باتری :</p>
                            <p>3240 میلی‌ آمپر ساعت</p>
                        </div>

                        <div className='flex flex-col gap-4 bg-blue-50 p-4 rounded-lg'>
                            <p className='font-semibold text-black'>سنسورها :</p>
                            <p>Face ID، شتاب سنج، ژیروسکوپ، سنسور مجاورت، قطب‌ نما، فشارسنج</p>
                        </div>
                    </>
                )}

                {/* Button for show more or show less specifications  */}

                {showMore ? (
                    <button onClick={() => setShowMore(false)} className='flex items-center text-blue-600 text-base font-semibold py-2 px-4'>
                        <span>بستن</span>
                        <BiChevronUp size={18} />
                    </button>
                ) : (
                    <>
                        <button onClick={() => setShowMore(true)} className='flex items-center text-blue-600 text-base font-semibold py-2 px-4'>
                            <span>نمایش بیشتر</span>
                            <BiChevronDown size={18} />
                        </button >
                    </>
                )}

            </div>
        </div >
    )
}

export default ProductSpecifications;
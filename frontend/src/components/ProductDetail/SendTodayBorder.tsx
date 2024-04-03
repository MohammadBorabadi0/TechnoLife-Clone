import Image from "next/image"

// icons 
import { BiChevronLeft } from "react-icons/bi";
import { BsShop } from "react-icons/bs";

const SendTodayBorder = () => {
    return (
        <section className="flex flex-col gap-5 md:bg-white md:border border-gray-100 md:p-5 mb-5 rounded-lg md:shadow-md">
            {/* For md to up sizes  */}
            <div className="hidden md:block h-24 w-full rounded bg-gradient-to-r from-[#00AADF] via-[#8448D0] to-[#F000BB] p-[3px]">
                <div className="flex justify-between items-center h-full w-full bg-white px-5">
                    <div className='flex flex-col gap-3'>
                        <span className='text-black font-semibold'>ارسال امروز</span>
                        <button className='flex items-center gap-1 text-blue-600'>
                            <span>توضیحات بیشتر</span>
                            <BiChevronLeft size={18} />
                        </button>
                    </div>
                    <div>
                        <Image src='/images/delivery_today.svg' alt='delivery_icon' width={120} height={50} />
                    </div>
                </div>
            </div>

            <div className='hidden md:flex text-xs justify-between items-center border border-orange-600  bg-orange-100 p-5 rounded'>
                <div className='flex items-center gap-2'>
                    <BsShop size={18} />
                    <span className='pt-1'>امکان تحویل حضوری در شعب تکنولایف</span>
                </div>
                <BiChevronLeft size={18} />
            </div>

            {/* -------------------------------------------------------------------------------------------------------- */}

            {/* For mobile screen sizes  */}
            <div className="md:hidden h-24 w-full rounded bg-gradient-to-r from-[#00AADF] via-[#8448D0] to-[#F000BB] p-[3px]">
                <div className="flex justify-between items-center h-full w-full bg-white px-5">
                    <div className='flex flex-col gap-3'>
                        <span className='text-black font-semibold'>ارسال امروز</span>
                        <button className='flex items-center gap-1 text-blue-600'>
                            <span>توضیحات بیشتر</span>
                            <BiChevronLeft size={18} />
                        </button>
                    </div>
                    <div>
                        <Image src='/images/delivery_today.svg' alt='delivery_icon' width={120} height={50} />
                    </div>
                </div>
            </div>

            <div className='flex md:hidden text-xs justify-between items-center border border-orange-600  bg-orange-100 p-5 rounded'>
                <div className='flex items-center gap-2'>
                    <BsShop size={18} />
                    <span className='pt-1'>امکان تحویل حضوری در شعب تکنولایف</span>
                </div>
                <BiChevronLeft size={18} />
            </div>
        </section>
    )
}

export default SendTodayBorder
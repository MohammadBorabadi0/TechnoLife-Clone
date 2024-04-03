import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

interface IProps {
    setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const Filters: FC<IProps> = ({ setShowFilters }) => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const isScrolledToBottom = scrollTop + windowHeight >= documentHeight;

            if (isScrolledToBottom) {
                window.removeEventListener('scroll', handleScroll); // Remove the event listener
                setIsScrolled(false); // Update the state to prevent further updates
            } else {
                if (scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div
            className={`fixed ${isScrolled ? 'top-24' : 'top-[204px]'} max-h-[80vh] -z-10 bg-[#FCFEFF] overflow-hidden border w-[264px] border-slate-300 rounded-lg`}
        >
            <div className='flex flex-col rounded-md'>
                <div className='flex justify-between items-center border-b p-4'>
                    <span className='flex items-center gap-1 font-semibold text-sm'>
                        <FaFilter />
                        <span>فیلترها</span>
                    </span>
                    <button
                        className='flex items-center font-semibold text-xl text-blue-600'
                        onClick={() => setShowFilters(false)}
                    >
                        <span>
                            <FiChevronRight />
                        </span>
                        <span className='-mr-1'>|</span>
                    </button>
                </div>

                <section className='flex flex-col gap-5 pt-3 pb-10 scrollbar'>
                    <div className='flex justify-between text-sm px-4'>
                        <span>فیلتر براساس قیمت</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>شبکه اینترنت</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>حافظه RAM</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>حافظه داخلی</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>دوربین جلو</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>ضد آب</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>مناسب برای</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>ظرفیت باتری</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>قابلیت شارژ سریع</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>سایز صفحه نمایش</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>تعداد هسته پردازشگر</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>کیفیت دوربین</span>
                        <IoIosArrowDown size={17} />
                    </div>
                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>

                    <div className='flex justify-between text-sm px-4'>
                        <span>رنگ ها</span>
                        <IoIosArrowDown size={17} />
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Filters
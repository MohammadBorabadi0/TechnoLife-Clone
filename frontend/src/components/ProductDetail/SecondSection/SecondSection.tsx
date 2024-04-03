import Image from "next/image"

// Utils 
import { En_To_Fa } from "@/utils/functions"


const SecondSection = () => {
    return (
        <>
            {/* Product Quarantee Icons  */}
            <div className='flex justify-center items-center gap-3 md:gap-10 pb-5 text-[10px] sm:text-xs md:text-sm'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src='/images/guarantee.svg' alt='guarantee' width={60} height={60} className="w-12 sm:w-16" />
                    <span className="text-center">{En_To_Fa(`7`)} روز ضمانت بازگشت کالا</span>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src='/images/time.svg' alt='time' width={60} height={60} className="w-12 sm:w-16" />
                    <span className="text-center">پرداخت اقساطی</span>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src='/images/original-warranty.svg' alt='original-warranty' width={60} height={60} className="w-12 sm:w-16" />
                    <span className="text-center">ضمانت اصالت کالا</span>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src='/images/pay-at-home.svg' alt='pay-at-home' width={60} height={60} className="w-12 sm:w-16" />
                    <span className="text-center">پرداخت در محل</span>
                </div>
            </div>
        </>
    )
}

export default SecondSection
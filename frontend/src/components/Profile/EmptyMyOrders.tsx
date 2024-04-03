import Image from 'next/image';

const EmptyMyOrders = () => {
  return (
     <div className="flex flex-col justify-center items-center gap-7 bg-gray-custom my-3 rounded h-[300px] lg:h-[500px]">
     <p>سفارش فعالی در این صفحه وجود ندارد</p>
     <Image
       src="/images/order-empty.webp"
       alt="order-is-empty"
       width={300}
       height={300}
       className="w-52 object-cover"
     />
   </div>
  )
}

export default EmptyMyOrders;
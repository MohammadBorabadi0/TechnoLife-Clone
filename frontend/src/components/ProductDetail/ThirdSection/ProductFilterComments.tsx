import { IoFilter } from "react-icons/io5";

const ProductFilterComments = () => {
  return (
    <div className='flex gap-8 bg-blue-50 p-5 rounded-lg flex-1'>
      <div className='flex items-center gap-2 text-black'>
        <IoFilter />
        <span className='font-semibold'>ترتیب:</span>
      </div>
      <ul className='flex gap-5'>
        <li>جدیدترین</li>
        <li>قدیمی ترین</li>
        <li>بیشترین امتیاز</li>
        <li>کمترین امتیاز</li>
      </ul>
    </div>
  )
}

export default ProductFilterComments;
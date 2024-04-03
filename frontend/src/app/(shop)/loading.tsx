import Image from "next/image";

const Loading = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <Image src="/loading2.svg" alt="loading" width={70} height={70} />
    </div>
  );
};

export default Loading;

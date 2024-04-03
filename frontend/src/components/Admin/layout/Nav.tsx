import Avatar from "react-avatar";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-purple-50 border-b border-purple-200 w-full h-fit p-4 pr-8 shadow-sm">
      <h2 className="text-base md:text-xl">سلام محمد</h2>
      <Avatar
        name="محمد"
        size="40"
        round={true}
        style={{ fontFamily: "Vazirmatn" }}
      />
    </nav>
  );
};

export default Nav;

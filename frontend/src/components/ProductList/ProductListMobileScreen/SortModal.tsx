import { sortData } from "@/data/data";
import { useModal } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BiFilter } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

const SortModal = () => {
  const { activeSort, setActiveSort, setShowSortModal } = useModal(
    (state) => state
  );

  const searchParams = useSearchParams();

  const handleCreateQuery = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (value === "asc" && newSearchParams.get("sort") === "asc") {
        newSearchParams.delete("sort");
      } else if (value === "desc" && newSearchParams.get("sort") === "desc") {
        newSearchParams.delete("sort");
      } else if (
        value === "date-desc" &&
        newSearchParams.get("sort") === "date-desc"
      ) {
        newSearchParams.delete("sort");
      } else if (
        value === "discount-desc" &&
        newSearchParams.get("sort") === "discount-desc"
      ) {
        newSearchParams.delete("sort");
      } else {
        newSearchParams.set(name, value);
      }

      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

  const handleChangeActiveSort = (id: number, name: string) => {
    setActiveSort(id, name);
    setShowSortModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-sm bg-opacity-50"
      onClick={() => setShowSortModal(false)}
    >
      <div
        className="flex flex-col gap-5 bg-white rounded-lg h-fit p-3 pb-5 w-[180px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          <BiFilter />
          <span>ترتیب:</span>
        </div>
        <ul>
          {sortData.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleChangeActiveSort(item.id, item.name)}
            >
              <button
                className="flex items-center gap-2 p-2"
                onClick={() => handleCreateQuery("sort", item.query)}
              >
                <TiTick
                  size={18}
                  className={`text-green-600 ${
                    activeSort.id === index ? "visible" : "invisible"
                  }`}
                />

                <span className={activeSort.id === index ? "text-black" : ""}>
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortModal;

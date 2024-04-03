import { useColorStore } from "@/store/store";
import { useEffect, useState } from "react";

const ColorPicker = () => {
  const [mount, setMount] = useState(false);

  const { code, setColorCode } = useColorStore((state) => state);

  useEffect(() => {
    setMount(true);
  }, []);

  if (mount)
    return (
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={code}
          onChange={(e) => setColorCode(e.target.value)}
        />
        <span
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: code }}
        ></span>
        <span className="text-gray-700">{code}</span>
      </div>
    );
};

export default ColorPicker;

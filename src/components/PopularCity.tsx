import Link from "next/link";
import React from "react";
import cityImg from "../../public/city-alt.jpg";

const PopularCity: React.FC = () => {
  return (
    <div className="h-72 w-60 min-w-60">
      <Link href="#">
        <div>
          <img
            src={cityImg.src}
            alt="School Picture"
            className="size-60 rounded-xl object-cover"
          />
        </div>
        <div className="mt-1">
          <h3 className="text-xl">Mysłowice</h3>
          <p className="text-sm">163 reviews</p>
        </div>
      </Link>
    </div>
  );
};

export { PopularCity };

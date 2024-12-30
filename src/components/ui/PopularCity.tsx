import Link from "next/link";
import React from "react";

const PopularCity: React.FC = () => {
  return (
    <div className="w-60 h-72 min-w-60">
      <Link href="#">
        <div>
          <img
            src="#"
            alt="School Picture"
            className="size-60 border border-green-500 rounded-xl"
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

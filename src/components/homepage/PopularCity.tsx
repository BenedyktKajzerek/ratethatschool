import Link from "next/link";
import React from "react";
import cityImg from "../../../public/city-alt.jpg";
import { CityModel } from "@/types/firestoreModels";
import Image from "next/image";

interface PopularCityProps {
  city: CityModel;
}

const PopularCity: React.FC<PopularCityProps> = ({ city }) => {
  return (
    <div className="h-72 w-60 min-w-60">
      <Link href={`cities/${city.country.slug}/${city.slug}`}>
        <div>
          <Image
            src={cityImg.src}
            alt="School Picture"
            className="size-60 rounded-xl object-cover"
          />
        </div>

        <div className="mt-1">
          <h3 className="truncate text-xl capitalize">{`${city.name}, ${city.country.name}`}</h3>
          <p className="text-sm">{city.reviewsCount} Reviews</p>
        </div>
      </Link>
    </div>
  );
};

export { PopularCity };

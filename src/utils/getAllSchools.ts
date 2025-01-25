import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { GroupedSchools } from "@/types/groupedSchools";

export const getAllSchools = async () => {
  const schoolsSnap = await getDocs(
    query(
      collection(db, "schools"),
      orderBy("country.name"),
      orderBy("city.name"),
      orderBy("name"),
    ),
  );

  const schools = schoolsSnap.docs.map((doc) => doc.data());

  const groupedData = schools.reduce(
    (groupedData, { country, city, name, slug }) => {
      const { name: countryName, slug: countrySlug } = country;
      const { name: cityName, slug: citySlug } = city;

      // Initialize country if not present already
      if (!groupedData[countrySlug]) {
        groupedData[countrySlug] = {
          name: countryName,
          slug: countrySlug,
          cities: {},
        };
      }

      // Initialize city if not present already
      if (!groupedData[countrySlug].cities[citySlug]) {
        groupedData[countrySlug].cities[citySlug] = {
          name: cityName,
          slug: citySlug,
          schools: [],
        };
      }

      // Push a school into its city
      groupedData[countrySlug].cities[citySlug].schools.push({
        name,
        slug,
      });

      return groupedData;
    },
    {} as GroupedSchools,
  );

  return { groupedData, totalSchools: schools.length };
};

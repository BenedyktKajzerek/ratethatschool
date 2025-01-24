import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
    (groupedData, { country, city, name }) => {
      const countryName = country.name;
      const cityName = city.name;

      // Initialize country/city if not already present
      if (!groupedData[countryName]) groupedData[countryName] = {};
      if (!groupedData[countryName][cityName])
        groupedData[countryName][cityName] = [];

      // Push a school into its city
      groupedData[countryName][cityName].push(name);

      return groupedData;
    },
    {} as Record<string, Record<string, string[]>>,
  );

  return { groupedData, totalSchools: schools.length };
};

import { getCharacters, getLocation } from "rickmortyapi";

const fetchAllCharacters = async () => {
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let allCharacters = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const response = await getCharacters({ page });
      const { info, results } = response.data;
      console.log(`Page ${page} fetched successfully.`);
      allCharacters = allCharacters.concat(results);
      page++;
      await pause(600);
      hasNextPage = info.next !== null;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      hasNextPage = false;
    }
  }

  return allCharacters;
};

const fetchLocationByUrl = async (url) => {
  const locationId = Number(url.split("/").pop());
  try {
    const response = await getLocation(locationId);
    const locationData = response.data;
    if (locationData) {
      console.log(`Location for ID ${locationId} fetched successfully.`);
      return locationData;
    } else {
      throw new Error(`Location not found for URL: ${url}`);
    }
  } catch (error) {
    console.error(`Error fetching location ${locationId}:`, error);
    return null;
  }
};

export default {
  fetchAllCharacters,
  fetchLocationByUrl,
};

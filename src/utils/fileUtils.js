import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Función para obtener el __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFolder = path.resolve(__dirname, "../data");

export const writeToJsonFile = (filename, data) => {
  try {
    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder);
    }

    const filePath = path.join(dataFolder, filename);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);

    console.log(`File ${filename} successfully written.`);
  } catch (error) {
    console.error(`Error writing to file ${filename}:`, error);
  }
};

export const readFromJsonFile = (filename) => {
  try {
    const filePath = path.join(dataFolder, filename);
    if (!fs.existsSync(filePath)) return [];
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (error) {
    console.error(`Error reading from file ${filename}:`, error);
    return [];
  }
};

export const findContactByCharacterId = (characterId) => {
  const primeCharacters = readFromJsonFile("primeCharacters.json");
  return primeCharacters.find((char) => char.id === characterId);
};

export const findCompanyByLocationId = (locationId) => {
  const locations = readFromJsonFile("locations.json");
  return locations.find((location) => location.id === locationId);
};

export const saveLocationToJson = (location) => {
  try {
    const locations = readFromJsonFile("locations.json");
    if (!locations.find((loc) => loc.id === location.id)) {
      locations.push(location);
      writeToJsonFile("locations.json", locations);
    }
  } catch (error) {
    console.error(`Error saving location ${location.id}:`, error);
  }
};

export const updateCharacterWithHubspotId = (
  characterId,
  hubspotId,
  keyName
) => {
  try {
    const characters = readFromJsonFile("primeCharacters.json");
    const characterIndex = characters.findIndex(
      (char) => char.id === Number(characterId)
    );
    if (characterIndex !== -1) {
      characters[characterIndex][keyName] = hubspotId;
      writeToJsonFile("primeCharacters.json", characters);
    }
  } catch (error) {
    console.error(
      `Error updating character ${characterId} with ${keyName} ${hubspotId}:`,
      error
    );
  }
};

export const updateLocationWithHubspotCompanyId = (
  locationId,
  companyId,
  keyName
) => {
  const locations = readFromJsonFile("locations.json");
  const locationIndex = locations.findIndex(
    (loc) => loc.id === Number(locationId)
  );
  if (locationIndex !== -1) {
    locations[locationIndex][keyName] = companyId;
    writeToJsonFile("locations.json", locations);
  }
};

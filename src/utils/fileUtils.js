import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Función para obtener el __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFolder = path.resolve(__dirname, "../data");
const locationsFilePath = path.join(dataFolder, "locations.json");

const writeToJsonFile = (filename, data) => {
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

const readFromJsonFile = (filename) => {
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

const findCompanyByLocationId = (locationId) => {
  const locations = readFromJsonFile("locations.json");
  return locations.find((location) => location.id === locationId);
};

const saveLocationToJson = (location) => {
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

export {
  writeToJsonFile,
  readFromJsonFile,
  findCompanyByLocationId,
  saveLocationToJson,
  locationsFilePath,
};

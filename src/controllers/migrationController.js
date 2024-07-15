import hubspotService from "../services/hubspotService.js";
import rickAndMortyService from "../services/rickAndMortyService.js";
import hubspotPropertyService from "../services/hubspotPropertyService.js";
import { isPrime } from "../utils/helpers.js";
import { writeToJsonFile } from "../utils/fileUtils.js";
import {
  findCompanyByLocationId,
  saveLocationToJson,
} from "../utils/fileUtils.js";

export const migrateData = async (req, res) => {
  try {
    await hubspotPropertyService.createCustomProperties();

    const characters = await rickAndMortyService.fetchAllCharacters();
    const primeCharacters = characters.filter(
      (character) => character.id === 1 || isPrime(character.id)
    );
    writeToJsonFile("primeCharacters.json", primeCharacters);

    let migratedCount = 0;

    for (const character of primeCharacters) {
      /* const contact = await hubspotService.createContact(character); */
      console.log(`Contact for character ${character.name} created in HubSpot`);
      migratedCount++;

      const location = await rickAndMortyService.fetchLocationByUrl(
        character.location.url
      );
      if (location) {
        const existingCompany = findCompanyByLocationId(location.id);
        if (!existingCompany) {
          const company = await hubspotService.createCompany(location);
          console.log(`Company ${location.name} created in HubSpot`);
          /* await hubspotService.associateContactToCompany(
            contact.id,
            company.id
          ); */
          saveLocationToJson(location); // Save the location after creating the company
        }
      }
    }

    console.log(`Migration complete. ${migratedCount} characters migrated.`);
    res.status(200).send("Migration completed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during migration");
  }
};

export const getApiInfo = (req, res) => {
  res.json({
    migrate: `${req.protocol}://${req.get("host")}/api/migrate`,
  });
};

import hubspotService from "../services/hubspotService.js";
import rickAndMortyService from "../services/rickAndMortyService.js";
import { isPrime } from "../utils/helpers.js";
import {
  findCompanyByLocationId,
  saveLocationToJson,
  updateCharacterWithHubspotId,
  updateLocationWithHubspotCompanyId,
  writeToJsonFile,
} from "../utils/fileUtils.js";

export const migrateData = async (req, res) => {
  try {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const characters = await rickAndMortyService.fetchAllCharacters();
    const primeCharacters = characters.filter(
      (character) => character.id === 1 || isPrime(character.id)
    );
    writeToJsonFile("primeCharacters.json", primeCharacters);

    let migratedCount = 0;

    for (const character of primeCharacters) {
      const contact = await hubspotService.createContact(character);
      await pause(300);

      if (contact && contact.id) {
        console.log(
          `Contact for character ${character.name} created in HubSpot with ID ${contact.id}`
        );
        migratedCount++;

        updateCharacterWithHubspotId(character.id, contact.id, "hubspotId");

        const location = await rickAndMortyService.fetchLocationByUrl(
          character.location.url
        );
        if (location) {
          let company = findCompanyByLocationId(location.id);

          let hubspotCompanyId;
          if (company) {
            // Use the existing HubSpot company ID
            hubspotCompanyId = company.hubspotCompanyId;
            console.log(
              `Existing company found with HubSpot ID: ${hubspotCompanyId}`
            );
          } else {
            // Create a new company in HubSpot
            company = await hubspotService.createCompany(location);
            if (company && company.id) {
              console.log(`New company created with HubSpot ID: ${company.id}`);
              saveLocationToJson(location);
              updateLocationWithHubspotCompanyId(location.id, company.id);
              hubspotCompanyId = company.id;
            }
          }

          if (hubspotCompanyId) {
            await hubspotService.associateContactToCompany(
              contact.id,
              hubspotCompanyId
            );
            console.log(
              `Contact ${contact.id} associated with Company ${hubspotCompanyId}`
            );
          }
        }
      } else {
        console.error(
          `Failed to create contact for character ${character.name}`
        );
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

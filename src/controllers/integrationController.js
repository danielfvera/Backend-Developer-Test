import {
  hubspotClientPrimary,
  hubspotClientMirror,
} from "../config/hubspotConfig.js";
import hubspotService from "../services/hubspotService.js";
import {
  findCompanyByLocationId,
  findContactByCharacterId,
  updateCharacterWithHubspotId,
  updateLocationWithHubspotCompanyId,
} from "../utils/fileUtils.js";

export const updateContacts = async (req, res) => {
  try {
    const contact = req.body;
    const characterId = Number(contact.properties.character_id.value);
    const hubspotIdMirror =
      findContactByCharacterId(characterId)?.hubspotIdMirror;
    console.log(hubspotIdMirror);
    if (hubspotIdMirror) {
      console.log("enter already created");
      // Update existing contact in mirror account
      await hubspotService.updateContact(
        hubspotIdMirror,
        contact,
        hubspotClientMirror
      );
    } else {
      console.log("to create");
      // Create new contact in mirror account
      const newHubspotId = await hubspotService.createMirrorContact(
        contact,
        hubspotClientMirror
      );
      console.log(newHubspotId.id);
      updateCharacterWithHubspotId(
        characterId,
        newHubspotId.id,
        "hubspotIdMirror"
      );
    }

    res.status(200).send("Contact updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCompanies = async (req, res) => {
  try {
    const company = req.body;
    const locationId = Number(company.properties.location_id.value);
    const hubspotCompanyIdMirror =
      findCompanyByLocationId(locationId)?.hubspotCompanyIdMirror;
    console.log(hubspotCompanyIdMirror);
    if (hubspotCompanyIdMirror) {
      console.log("company already created");
      // Update existing company in mirror account
      await hubspotService.updateCompany(
        hubspotCompanyIdMirror,
        company,
        hubspotClientMirror
      );
    } else {
      console.log("company to create");
      // Create new company in mirror account
      const newHubspotId = await hubspotService.createMirrorCompany(
        company,
        hubspotClientMirror
      );
      console.log(newHubspotId.id);
      updateLocationWithHubspotCompanyId(
        locationId,
        newHubspotId.id,
        "hubspotCompanyIdMirror"
      );
    }

    res.status(200).send("Company updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

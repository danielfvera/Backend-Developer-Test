import { hubspotClientMirror } from "../config/hubspotConfig.js";
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
    const characterId = Number(contact.properties.character_id?.value);
    const hubspotIdMirror =
      findContactByCharacterId(characterId)?.hubspotIdMirror;
    if (hubspotIdMirror) {
      // Update existing contact in mirror account
      await hubspotService.updateContact(
        hubspotIdMirror,
        contact,
        hubspotClientMirror
      );
    } else {
      // Create new contact in mirror account
      const newHubspotId = await hubspotService.createMirrorContact(
        contact,
        hubspotClientMirror
      );
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
    const locationId = Number(company.properties.location_id?.value);
    const hubspotCompanyIdMirror =
      findCompanyByLocationId(locationId)?.hubspotCompanyIdMirror;
    if (hubspotCompanyIdMirror) {
      // Update existing company in mirror account
      await hubspotService.updateCompany(
        hubspotCompanyIdMirror,
        company,
        hubspotClientMirror
      );
    } else {
      // Create new company in mirror account
      const newHubspotId = await hubspotService.createMirrorCompany(
        company,
        hubspotClientMirror
      );
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

import hubspotClient from "../config/hubspotConfig.js";

const createContact = async (character) => {
  const contactProperties = {
    properties: {
      character_id: character.id.toString(),
      firstname: character.name.split(" ")[0],
      lastname: character.name.split(" ")[1] || "",
      status_character: character.status,
      character_species: character.species,
      character_gender: character.gender,
    },
  };

  const response = await hubspotClient.crm.contacts.basicApi.create(
    contactProperties
  );
  return response.body;
};

const createCompany = async (location) => {
  const companyProperties = {
    properties: {
      location_id: location.id.toString(),
      name: location.name,
      location_type: location.type,
      dimension: location.dimension,
      creation_date: location.created,
    },
  };

  const response = await hubspotClient.crm.companies.basicApi.create(
    companyProperties
  );
  return response.body;
};

const associateContactToCompany = async (contactId, companyId) => {
  const associationType = "contact_to_company";
  await hubspotClient.crm.contacts.associationsApi.create(
    contactId,
    "companies",
    companyId,
    associationType
  );
};

export default {
  createContact,
  createCompany,
  associateContactToCompany,
};

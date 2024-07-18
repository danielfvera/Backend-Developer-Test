import {
  hubspotClientPrimary,
  hubspotClientMirror,
} from "../config/hubspotConfig.js";

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

  const response = await hubspotClientPrimary.crm.contacts.basicApi.create(
    contactProperties
  );
  return response;
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

  const response = await hubspotClientPrimary.crm.companies.basicApi.create(
    companyProperties
  );
  return response;
};

const associateContactToCompany = async (contactId, companyId) => {
  try {
    const objectType = "0-1";
    const objectId = contactId.toString();
    const toObjectType = "0-2";
    const toObjectId = companyId.toString();
    const AssociationSpec = [
      {
        associationCategory: "HUBSPOT_DEFINED",
        associationTypeId: 279,
      },
    ];

    await hubspotClientPrimary.crm.associations.v4.basicApi.create(
      objectType,
      objectId,
      toObjectType,
      toObjectId,
      AssociationSpec
    );
    console.log(`Associated contact ${contactId} with company ${companyId}`);
  } catch (error) {
    console.error(
      `Error associating contact ${contactId} with company ${companyId}:`,
      error
    );
  }
};

const createMirrorContact = async (character, hubspotClient) => {
  const contactProperties = {
    properties: {
      character_id: character.properties.character_id?.value,
      firstname: character.properties.firstname?.value,
      lastname: character.properties.lastname?.value,
      status_character: character.properties.status_character?.value,
      character_species: character.properties.character_species?.value,
      character_gender: character.properties.character_gender?.value,
    },
  };

  const response = await hubspotClient.crm.contacts.basicApi.create(
    contactProperties
  );
  return response;
};
const createMirrorCompany = async (company, hubspotClient) => {
  const contactProperties = {
    properties: {
      location_id: company.properties.location_id?.value,
      name: company.properties.name?.value,
      location_type: company.properties.location_type?.value,
      dimension: company.properties.dimension?.value,
      creation_date: company.properties.creation_date?.value,
    },
  };

  const response = await hubspotClient.crm.companies.basicApi.create(
    contactProperties
  );
  return response;
};

const updateContact = async (contactId, contact, hubspotClient) => {
  const contactProperties = {
    properties: {
      character_id: contact.properties.character_id?.value,
      firstname: contact.properties.firstname?.value,
      lastname: contact.properties.lastname?.value,
      status_character: contact.properties.status_character?.value,
      character_species: contact.properties.character_species?.value,
      character_gender: contact.properties.character_gender?.value,
    },
  };

  await hubspotClient.crm.contacts.basicApi.update(
    contactId,
    contactProperties
  );
};

const updateCompany = async (companyId, company, hubspotClient) => {
  const companyProperties = {
    properties: {
      location_id: company.properties.location_id?.value,
      name: company.properties.name?.value,
      location_type: company.properties.location_type?.value,
      dimension: company.properties.dimension?.value,
      creation_date: company.properties.creation_date?.value,
    },
  };

  await hubspotClient.crm.companies.basicApi.update(
    companyId,
    companyProperties
  );
};

export default {
  createContact,
  createCompany,
  associateContactToCompany,
  createMirrorContact,
  createMirrorCompany,
  updateContact,
  updateCompany,
};

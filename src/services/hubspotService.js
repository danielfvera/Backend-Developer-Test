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

  const response = await hubspotClient.crm.companies.basicApi.create(
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

    await hubspotClient.crm.associations.v4.basicApi.create(
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

export default {
  createContact,
  createCompany,
  associateContactToCompany,
};

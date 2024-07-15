import hubspotClient from "../config/hubspotConfig.js";

const createProperty = async (objectType, property) => {
  try {
    await hubspotClient.crm.properties.coreApi.create(objectType, property);
    console.log(`Property ${property.name} created successfully`);
  } catch (error) {
    if (
      error.body &&
      error.body.subCategory === "Properties.PROPERTY_WITH_NAME_EXISTS"
    ) {
      console.log(`Property ${property.name} already exists`);
    } else {
      console.error(`Error creating property ${property.name}:`, error);
    }
  }
};

const createCustomProperties = async () => {
  // Contact properties
  await createProperty("contacts", {
    name: "character_id",
    label: "character_id",
    groupName: "contactinformation",
    type: "string",
    fieldType: "text",
    displayOrder: -1,
    options: null,
  });

  await createProperty("contacts", {
    name: "status_character",
    label: "status_character",
    groupName: "contactinformation",
    type: "enumeration",
    fieldType: "select",
    displayOrder: -1,
    options: [
      { label: "Alive", value: "alive" },
      { label: "Dead", value: "dead" },
      { label: "Unknown", value: "unknown" },
    ],
  });

  await createProperty("contacts", {
    name: "character_species",
    label: "character_species",
    groupName: "contactinformation",
    type: "string",
    fieldType: "text",
    displayOrder: -1,
    options: null,
  });

  await createProperty("contacts", {
    name: "character_gender",
    label: "character_gender",
    groupName: "contactinformation",
    type: "enumeration",
    fieldType: "select",
    displayOrder: -1,
    options: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
      { label: "Genderless", value: "genderless" },
      { label: "Unknown", value: "unknown" },
    ],
  });

  // Company properties
  await createProperty("companies", {
    name: "location_id",
    label: "location_id",
    groupName: "companyinformation",
    type: "string",
    fieldType: "text",
    displayOrder: -1,
    options: null,
  });

  await createProperty("companies", {
    name: "location_type",
    label: "location_type",
    groupName: "companyinformation",
    type: "string",
    fieldType: "text",
    displayOrder: -1,
    options: null,
  });

  await createProperty("companies", {
    name: "dimension",
    label: "dimension",
    groupName: "companyinformation",
    type: "string",
    fieldType: "text",
    displayOrder: -1,
    options: null,
  });

  await createProperty("companies", {
    name: "creation_date",
    label: "creation_date",
    groupName: "companyinformation",
    type: "date",
    fieldType: "date",
    displayOrder: -1,
    options: null,
  });
};

export default {
  createCustomProperties,
};

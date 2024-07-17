import { Client } from "@hubspot/api-client";

const hubspotClientPrimary = new Client({
  accessToken: process.env.HUBSPOT_API_KEY,
});
const hubspotClientMirror = new Client({
  accessToken: process.env.HUBSPOT_MIRROR_API_KEY,
});

export { hubspotClientPrimary, hubspotClientMirror };

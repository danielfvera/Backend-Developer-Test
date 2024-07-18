# HubSpot-RickAndMorty Integration

This project integrates data from the Rick and Morty API with HubSpot, migrating specific characters and their associated locations to HubSpot as contacts and companies. Additionally, it sets up webhook-based synchronization to keep the data updated between the primary and mirror HubSpot accounts.

## Features

- **Data Migration**: Fetches characters and locations from the Rick and Morty API and migrates them to HubSpot.
- **Webhook Integration**: Ensures synchronization between primary and mirror HubSpot accounts for both contacts and companies.
- **Rate Limiting**: Includes a pause to respect HubSpot's rate limit of 10 API calls per second.

## Deployment

The application is deployed on Render and can be accessed at [http://backend-developer-test.onrender.com/](http://backend-developer-test.onrender.com/).

## Endpoints

### Migration Endpoint

**GET /api/migrate**

Initiates the data migration process from the Rick and Morty API to HubSpot.

### Webhook Endpoints

**POST /api/integrate/contacts**

Handles contact updates from the primary HubSpot account and synchronizes them with the mirror account.

**POST /api/integrate/companies**

Handles company updates from the primary HubSpot account and synchronizes them with the mirror account.

## Usage

### Data Migration

To start the data migration process, make a GET request to `/api/migrate`. This will:

1. Fetch all characters from the Rick and Morty API.
2. Filter the characters to only include prime characters.
3. Create contacts in HubSpot for these characters.
4. Create companies in HubSpot for the characters' locations.
5. Associate the contacts with the companies in HubSpot.

### Webhook Setup

To ensure synchronization between the primary and mirror HubSpot accounts, set up workflows in HubSpot that trigger webhooks on contact and company creation or updates.

1. **Create Workflows**: In your primary HubSpot account, create workflows for contacts and companies.
2. **Set Webhook Actions**: Configure the workflows to trigger POST requests to the webhook endpoints `/api/integrate/contacts` and `/api/integrate/companies` respectively.
3. **Enroll Entities**: Ensure that new contacts and companies are enrolled in these workflows to trigger the synchronization.

### Rate Limiting

To respect HubSpot's rate limit of 10 API calls per second, a pause function is used during the migration:

```javascript
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await pause(500);
``` 

This ensures that API calls to HubSpot are spaced appropriately to avoid hitting rate limits.

### Code Structure

1. /controllers: Contains the main logic for handling migration and webhook requests.
2. /services: Includes service files for interacting with the HubSpot API and the Rick and Morty
3. /utils: Utility functions for file operations and common helpers.

### Example

To trigger the data migration, you can use a tool like Postman to make a GET request to:

```javascript
http://backend-developer-test.onrender.com/api/migrate
``` 


To test the webhook functionality, set up a POST request in Postman with a sample payload to:

```javascript
http://backend-developer-test.onrender.com/api/integrate/contacts
``` 
or :
```javascript
http://backend-developer-test.onrender.com/api/integrate/companies
``` 
![HubSpot RickAndMorty Integration Diagram](https://github.com/danielfvera/Backend-Developer-Test/blob/main/assets/HubSpot-RickAndMorty-Integration-Diagram.png?raw=true)

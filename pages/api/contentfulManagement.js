import { createClient } from 'contentful-management';

let client;

try {
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
    throw new Error('CONTENTFUL_MANAGEMENT_TOKEN is not defined');
  }

  client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
} catch (error) {
  console.error('Error creating Contentful client:', error);
}

export async function getSpace() {
  if (!client) {
    throw new Error('Contentful client is not initialized');
  }
  if (!process.env.CONTENTFUL_SPACE_ID) {
    throw new Error('CONTENTFUL_SPACE_ID is not defined');
  }
  return client.getSpace(process.env.CONTENTFUL_SPACE_ID);
}

export async function getEnvironment(space) {
  return space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');
}
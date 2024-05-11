import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchThemeOptions() {
  try {
    const response = await client.getEntry('4iGdsk96V3ykxZGracUGeJ'); // Replace 'your_entry_id' with the actual ID of your Contentful entry
    const { backgroundColor, textColor, title } = response.fields; // Assuming your entry has fields for backgroundColor, textColor, and title
    return { backgroundColor, textColor, title };
  } catch (error) {
    console.error('Error fetching theme options from Contentful:', error);
    return null; // Return null in case of error
  }
}
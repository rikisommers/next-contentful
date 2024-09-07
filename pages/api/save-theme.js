import { getSpace, getEnvironment } from './contentfulManagement';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const theme = req.body;
        console.log('Received theme data:', theme);

        console.log('CONTENTFUL_MANAGEMENT_TOKEN:', process.env.CONTENTFUL_MANAGEMENT_TOKEN);
        console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID);
        console.log('CONTENTFUL_ENVIRONMENT:', process.env.CONTENTFUL_ENVIRONMENT);

        console.log('Attempting to get space...');
        const space = await getSpace();
        console.log('Space retrieved successfully');

        console.log('Attempting to get environment...');
        const environment = await getEnvironment(space);
        console.log('Environment retrieved successfully');

        // Find the existing settings entry
        const entries = await environment.getEntries({
          content_type: 'settings',
          limit: 1
        });
        
        let entry;
        if (entries.items.length > 0) {
          entry = entries.items[0];
          console.log('Found existing settings entry:', entry.sys.id);
        } else {
          // Create a new settings entry if none exists
          entry = await environment.createEntry('settings', {
            fields: {
              sitetitle: { 'en-US': 'Site Settings' }, // Use the field name from your content type
            },
          });
          console.log('Created new settings entry:', entry.sys.id);
        }
  
        // Update the entry with the new theme
        if (!entry.fields.customTheme) {
          entry.fields.customTheme = {};
        }
        entry.fields.customTheme['en-US'] = theme;
  
        // Save the updated entry
        const updatedEntry = await entry.update();
        console.log('Updated entry:', updatedEntry.sys.id);
  
        // Publish the entry
        await updatedEntry.publish();
        console.log('Published entry:', updatedEntry.sys.id);
  
        res.status(200).json({ message: 'Theme saved successfully' });
      } catch (error) {
        console.error('Error in save-theme API route:', error);
        res.status(500).json({ message: 'Error saving theme', error: error.message, stack: error.stack });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }
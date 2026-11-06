import { devOnly } from '../../lib/dev-only';
import { getSpace, getEnvironment } from '../../lib/contentful/management';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const customTheme = req.body;

      const space = await getSpace();
      const environment = await getEnvironment(space);

      // Find the existing settings entry
      const entries = await environment.getEntries({
        content_type: 'settings',
        limit: 1
      });
      
      let entry;
      if (entries.items.length > 0) {
        entry = entries.items[0];
      } else {
        // Create a new settings entry if none exists
        entry = await environment.createEntry('settings', {
          fields: {
            sitetitle: { 'en-US': 'Site Settings' },
          },
        });
      }

      // Update only the customTheme field
      if (!entry.fields.customTheme) {
        entry.fields.customTheme = {};
      }
      entry.fields.customTheme['en-US'] = customTheme;

      // Save the updated entry
      const updatedEntry = await entry.update();

      // Publish the entry
      await updatedEntry.publish();

      res.status(200).json({ message: 'Custom theme saved successfully' });
    } catch (error) {
      console.error('Error in save-custom-theme API route:', error);
      res.status(500).json({ message: 'Error saving custom theme', error: error.message, stack: error.stack });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
export default devOnly(handler);

import { getSpace, getEnvironment } from './contentfulManagement';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const space = await getSpace();
      const environment = await getEnvironment(space);

      // Find the existing settings entry
      const entries = await environment.getEntries({
        content_type: 'settings',
        limit: 1
      });
      
      if (entries.items.length > 0) {
        const entry = entries.items[0];
        const currentTheme = entry.fields.currentTheme?.['en-US'] || null;
        res.status(200).json({ currentTheme });
      } else {
        res.status(404).json({ message: 'No settings entry found' });
      }
    } catch (error) {
      console.error('Error fetching current theme:', error);
      res.status(500).json({ message: 'Error fetching current theme', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
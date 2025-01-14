import { getSpace, getEnvironment } from './contentfulManagement';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('Received request body:', req.body);
            const { name, data } = req.body; // Expecting name and data in the request body
            
            console.log('Theme Name:', name);
            console.log('Theme Data:', data); // Log the received data
            const space = await getSpace();
            const environment = await getEnvironment(space);

            // Check if a theme with the same name already exists
            const existingEntries = await environment.getEntries({
                content_type: 'theme',
                'fields.name': name, // Query for entries with the same name
            });

            if (existingEntries.items.length > 0) {
                return res.status(400).json({ message: 'Theme name already exists.' });
            }

            // Create a new theme entry
            const entry = await environment.createEntry('theme', {
                fields: {
                    name: {
                        'en-US': name, // Use the name directly
                    },
                    data: {
                        'en-US': data, // Use the data directly
                    },
                },
            });

            await entry.publish(); // Publish the entry
            console.log('Theme created successfully:', entry.sys.id);
            res.status(201).json({ message: 'Theme saved successfully', entry });

        } catch (error) {
            console.error('Error saving theme:', error);
            res.status(500).json({ message: 'Error saving theme', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
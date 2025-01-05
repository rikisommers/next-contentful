import { getSpace, getEnvironment } from './contentfulManagement'; // Adjust the import path as necessary

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const space = await getSpace();
            const environment = await getEnvironment(space);

            // Fetch entries of type 'theme'
            const entries = await environment.getEntries({
                content_type: 'theme', // Adjust this to your content type ID
            });

            // Map the entries to a simpler format
            const themes = entries.items.map(item => ({
                id: item.sys.id,
                name: item.fields.name['en-US'], // Adjust locale as necessary
                key: item.fields.key['en-US'], // Adjust locale as necessary
                data: item.fields.data['en-US'], // Adjust locale as necessary

            }));
            console.log('themes:', themes);

            res.status(200).json({ themes });
        } catch (error) {
            console.error('Error fetching themes:', error);
            res.status(500).json({ message: 'Error fetching themes' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
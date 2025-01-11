import { getSpace, getEnvironment } from './contentfulManagement';

export default async function handler(req, res) {
    const { id } = req.query; // This should be the Contentful entry ID
    console.log('Received DELETE request for entry ID:', id); // Log the ID received

    if (req.method === 'DELETE') {
        try {
            const space = await getSpace();
            const environment = await getEnvironment(space);
            const entry = await environment.getEntry(id); // Fetch the entry by ID

            if (!entry) {
                console.error('Entry not found for ID:', id); // Log if the entry is not found
                return res.status(404).json({ message: 'Entry not found' });
            }

            console.log('Found entry to delete:', entry.sys.id); // Log the ID of the entry to be deleted

            await entry.unpublish(); // Unpublish the entry first
            await entry.delete(); // Delete the entry
            console.log('Theme deleted successfully:', entry.sys.id); // Log successful deletion
            res.status(200).json({ message: 'Theme deleted successfully' });
        } catch (error) {
            console.error('Error deleting theme:', error);
            res.status(500).json({ message: 'Error deleting theme', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
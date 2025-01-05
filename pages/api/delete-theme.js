import { getSpace, getEnvironment } from './contentfulManagement';

export default async function handler(req, res) {
    const { id } = req.query; // This should be the Contentful entry ID
    if (req.method === 'DELETE') {
        try {
            const space = await getSpace();
            const environment = await getEnvironment(space);
            const entry = await environment.getEntry(id);
            await entry.unpublish(); // Unpublish the entry first
            await entry.delete(); // Delete the entry
            res.status(200).json({ message: 'Theme deleted successfully' });
        } catch (error) {
            console.error('Error deleting theme:', error);
            res.status(500).json({ message: 'Error deleting theme' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
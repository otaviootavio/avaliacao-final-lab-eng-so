import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    eventoId: string;
    assentos: string[];
};

// In-memory data store
const database: Record<string, string[]> = {
    '1': ['A1', 'A2', 'B1', 'B2'],
    '2': ['C1', 'C2', 'C3', 'D1'],
    '3': ['E1', 'E2', 'F1', 'F2', 'F3']
};
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | string>
) {
    const eventoId = typeof req.query.id === 'string' ? req.query.id : '';

    switch (req.method) {
        case 'GET':
            // Read operation
            if (database[eventoId]) {
                res.status(200).json({ eventoId, assentos: database[eventoId] });
            } else {
                res.status(404).json('Evento not found');
            }
            break;
        case 'POST':
            if (eventoId && !database[eventoId]) {
                database[eventoId] = req.body.assentos || [];
                res.status(201).json({ eventoId, assentos: database[eventoId] });
            } else {
                res.status(400).json('Evento already exists or invalid ID');
            }
            break;
        case 'PUT':
            if (eventoId && database[eventoId]) {
                database[eventoId] = req.body.assentos || [];
                res.status(200).json({ eventoId, assentos: database[eventoId] });
            } else {
                res.status(404).json('Evento not found');
            }
            break;
        case 'DELETE':
            if (eventoId && database[eventoId]) {
                delete database[eventoId];
                res.status(200).json('Evento deleted successfully');
            } else {
                res.status(404).json('Evento not found');
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

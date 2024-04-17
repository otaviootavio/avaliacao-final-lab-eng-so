// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    id: number;
    nome: string
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>,
) {
    if (req.method === 'GET') {
        res.status(200).json([{ id: 1, nome: 'Jogo do Campeonato' }, { id: 2, nome: 'Concerto no Parque' }]);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

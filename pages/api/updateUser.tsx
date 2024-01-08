// pages/api/updateUser.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Traitez les données reçues dans req.body
    const { userName, urlImage } = req.body; // Assurez-vous que ces champs correspondent à votre formulaire

    // Ici, insérez la logique de mise à jour de l'utilisateur
    // ...

    // Envoyez une réponse
    res.status(200).json({ message: 'Utilisateur mis à jour' });
  } else {
    // Gérer les méthodes non prises en charge
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

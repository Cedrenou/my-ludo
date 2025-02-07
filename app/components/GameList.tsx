// components/GameList.tsx

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface IGame {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt?: any;
}

const GameList: React.FC = () => {
    const [games, setGames] = useState<IGame[]>([]);

    useEffect(() => {
        // Souscription en temps réel à la collection "games"
        const unsubscribe = onSnapshot(collection(db, 'games'), (snapshot) => {
            const gamesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IGame[];
            setGames(gamesData);
        });

        return () => unsubscribe();
    }, []);

    // Fonction de suppression d'un jeu
    const handleDelete = async (id: string) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce jeu ?")) {
            try {
                await deleteDoc(doc(db, 'games', id));
                console.log('Jeu supprimé');
            } catch (error) {
                console.error('Erreur lors de la suppression du jeu : ', error);
            }
        }
    };

    return (
        <div className="space-y-4">
            {games.map((game) => (
                <div key={game.id} className="border p-4 rounded shadow">
                    <button onClick={() => console.log(game)}>log</button>
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <p>{game.description}</p>
                    <p>
                        <strong>Statut :</strong> {game.status}
                    </p>
                    <div className="flex gap-2 mt-2">
                        {/* Vous pourrez ensuite ajouter un lien vers la page d'édition */}
                        <button
                            onClick={() => handleDelete(game.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameList;

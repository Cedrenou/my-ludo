import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface IGame {
    id: number;
    title: string;
    description: string;
    status: string;
}

const GameList: React.FC = () => {
    const [games, setGames] = useState<IGame[]>([]);

    const fetchGames = async () => {
        const { data, error } = await supabase.from('games').select('*');
        if (error) {
            console.error('Erreur lors de la récupération des jeux :', error);
        } else {
            setGames(data as IGame[]);
        }
    };

    useEffect(() => {
        fetchGames();
        const channel = supabase.channel('games-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'games' },
                () => {
                    fetchGames();
                }
            )
            .subscribe();
        // Nettoyer le canal lors du démontage du composant
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async (id: number) => {
            const { error } = await supabase.from('games').delete().eq('id', id);
            if (error) {
                console.error('Erreur lors de la suppression du jeu :', error);
            } else {
                console.log('Jeu supprimé avec succès');
                await fetchGames();
            }
    };

    return (
        <div className="space-y-4">
            {games.map((game) => (
                <div key={game.id} className="border p-4 rounded shadow">
                    <button onClick={() => console.log(game)}>log</button>
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <p>{game.description}</p>
                    <p><strong>Statut :</strong> {game.status}</p>
                    <button onClick={() => handleDelete(game.id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default GameList;

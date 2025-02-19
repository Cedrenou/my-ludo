import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {useRouter} from "next/navigation";

interface IGame {
    id: number;
    title: string;
    description: string;
    status: string;
}

const GameList: React.FC = () => {
    const [games, setGames] = useState<IGame[]>([]);
    const router = useRouter();

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

    const handleEdit = (id: number) => {
        router.push(`/games/${id}`);
    }

    return (
        <div className="grid grid-cols-4 gap-4 space-y-4">
            {games.map((game) => (
                <div key={game.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <p>{game.description}</p>
                    <p><strong>Statut :</strong> {game.status}</p>
                    <button onClick={() => handleDelete(game.id)} className="bg-red-500 text-white px-3 py-1 rounded m-2">Supprimer</button>
                    <button onClick={() => handleEdit(game.id)} className="bg-blue-400 text-white px-3 py-1 rounded m-2">Editer</button>
                </div>
            ))}
        </div>
    );
};

export default GameList;

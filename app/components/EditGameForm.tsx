import {supabase} from "@/lib/supabase";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


interface Game {
    title: string;
    description: string;
    status: string;
}

interface EditGameFormProps {
    id: string
}

const EditGameForm = ({ id }: EditGameFormProps) => {
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    const fetchGame = async (id: string) => {
        const {data, error} = await supabase.from('games').select('*').eq('id', id);
        if (error) {
            console.error('Erreur lors de la récupération du jeu :', error);
        } else {
            setGame(data[0]);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchGame(id);
    }, [id]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.preventDefault()
        const { id, value } = e.target;
        if (!game) return;
        setGame({ ...game, [id]: value });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!game) return;
        const { data, error } = await supabase.from('games').update(game).eq('id', id).select();
        if (error) {
            console.error('Erreur lors de la mise à jour du jeu :', error);
        } else {
            console.log('Jeu mis à jour :', data);
            router.push('/');
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!game) {
        return <p>Le jeu n&apos;existe pas</p>;
    }

    return (
        <div>
            <h2>Édition du jeu {id}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input type="text" id="title" value={game.title} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>
                <div>
                    <label htmlFor="description">Description :</label>
                    <textarea id="description" value={game.description} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>
                <div>
                    <label htmlFor="status">Statut :</label>
                    <select id="status" value={game.status} onChange={handleChange} className="border p-2 rounded w-full">
                        <option value="available">Disponible</option>
                        <option value="loaned">Prêté</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enregistrer</button>
            </form>
        </div>
    );
}

export default EditGameForm;
'use client'
// components/EditGameForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IGameFormInputs {
    title: string;
    description: string;
    status: string;
}

interface EditGameFormProps {
    gameId: string;
}

const EditGameForm: React.FC<EditGameFormProps> = ({ gameId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IGameFormInputs>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupération des données du jeu à éditer
        const fetchGame = async () => {
            const docRef = doc(db, 'games', gameId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                reset(docSnap.data() as IGameFormInputs);
            } else {
                console.error('Jeu non trouvé');
            }
            setLoading(false);
        };

        fetchGame();
    }, [gameId, reset]);

    const onSubmit: SubmitHandler<IGameFormInputs> = async (data) => {
        try {
            const docRef = doc(db, 'games', gameId);
            await updateDoc(docRef, {
                title: data.title,
                description: data.description,
                status: data.status,
            });
            router.push('/games'); // Redirection vers la liste des jeux après modification
        } catch (error) {
            console.error("Erreur lors de la mise à jour du jeu : ", error);
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title">Titre du jeu :</label>
                <input
                    id="title"
                    type="text"
                    {...register("title", { required: "Le titre est requis" })}
                    className="border p-2 rounded w-full"
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description">Description :</label>
                <textarea
                    id="description"
                    {...register("description", { required: "La description est requise" })}
                    className="border p-2 rounded w-full"
                />
                {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="status">Statut :</label>
                <select
                    id="status"
                    {...register("status", { required: "Le statut est requis" })}
                    className="border p-2 rounded w-full"
                >
                    <option value="available">Disponible</option>
                    <option value="loaned">Prêté</option>
                </select>
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Mettre à jour le jeu
            </button>
        </form>
    );
};

export default EditGameForm;

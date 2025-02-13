// components/AddGameForm.tsx

import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../../lib/supabase';

interface IGameFormInputs {
    title: string;
    description: string;
    status: string;
}

const AddGameForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IGameFormInputs>();

    const onSubmit: SubmitHandler<IGameFormInputs> = async (data) => {
        const { error } = await supabase
            .from('games')
            .insert([{ title: data.title, description: data.description, status: data.status }]);
        if (error) {
            console.error('Erreur lors de l’ajout du jeu :', error);
        } else {
            console.log('Jeu ajouté avec succès');
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title">Titre du jeu :</label>
                <input id="title" type="text" {...register("title", { required: "Le titre est requis" })} className="border p-2 rounded w-full" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="description">Description :</label>
                <textarea id="description" {...register("description", { required: "La description est requise" })} className="border p-2 rounded w-full" />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div>
                <label htmlFor="status">Statut :</label>
                <select id="status" {...register("status", { required: "Le statut est requis" })} className="border p-2 rounded w-full">
                    <option value="available">Disponible</option>
                    <option value="loaned">Prêté</option>
                </select>
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded">Ajouter le jeu</button>
        </form>
    );
};

export default AddGameForm;

'use client'
import {usePathname} from "next/navigation";
import EditGameForm from "@/app/components/EditGameForm";

const EditGamePage = () => {
    const pathName = usePathname()
    // const { id } = router.query;

    const id = pathName.split('/').pop();

    if (!id || typeof id !== 'string') return <p>Chargement...</p>;

    return (
        <div>
            <h1>Édition du jeu </h1>
            <EditGameForm gameId={id} />
        </div>
    );
}

export default EditGamePage;
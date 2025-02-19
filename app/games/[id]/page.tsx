'use client'
import EditGameForm from "@/app/components/EditGameForm";
import {useParams} from "next/navigation";

const EditGamePage = () => {
  const { id } = useParams() as { id: string };
    return (
        <div>
            <h1>Édition du jeu </h1>
            <EditGameForm id={id} />
        </div>
    );
}

export default EditGamePage;
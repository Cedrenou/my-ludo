'use client';

import AddGameForm from '../components/AddGameForm';
import {useEffect} from "react";

const AdminPage: React.FC = () => {

    useEffect(() => {
        console.log(process.env)
    }, [])

    return (
        <div className="container mx-auto p-4">

            <h1 className="text-3xl font-bold mb-6">Administration des jeux</h1>
            <AddGameForm />
        </div>
    );
};

export default AdminPage;

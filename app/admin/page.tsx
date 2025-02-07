'use client';

import AddGameForm from '../components/AddGameForm';

const AdminPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">

            <h1 className="text-3xl font-bold mb-6">Administration des jeux</h1>
            <AddGameForm />
        </div>
    );
};

export default AdminPage;

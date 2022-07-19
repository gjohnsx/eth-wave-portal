import Card from './Card';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Dashboard(props) {

    const { currentUserData, setCurrentUserData } = useContext(UserContext);

    return (
        <>
        {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-gray-100">
            <body class="h-full">
            ```
        */}
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    <pre>{JSON.stringify(currentUserData, null, 2)}</pre>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}

                    <div className="px-4 py-4 sm:px-0">
                        <Card wave={props.wave} />
                    </div>

                    {/* /End replace */}

                </div>
            </main>
        </div>
    </>
    );
};

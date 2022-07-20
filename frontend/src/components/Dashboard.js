import Card from './Card';

export default function Dashboard(props) {
    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>

                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Dashboard Body */}

                        <div className="px-4 py-4 sm:px-0">
                            <Card wave={props.wave} />
                        </div>

                        {/* /End of Dashboard Body */}

                    </div>
                </main>
            </div>
        </>
    );
};

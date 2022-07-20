import { useState, useContext } from 'react';
import { WavesContext } from '../WavesContext';
import Wave from "./Wave";
import Modal from "./Modal";

export default function Card(props) {
    const [open, setOpen] = useState(false);

    const toggleModalOpen = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const { waves } = useContext(WavesContext);

    const sortedWaves = waves.sort((a, b) => b.timestamp - a.timestamp)

    return (
        <div className={`card-section border-4 border-gray-200 rounded-lg ${waves.length < 3 ? 'h-96' : ''}`}>

            <Modal open={open} setOpen={setOpen} wave={props.wave} />

            <div className="bg-indigo-500 px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-lg leading-6 font-medium text-white">Waves</h3>
                        <p className="mt-1 text-sm text-gray-100">
                            All of the waves stored on the Ethereum blockchain.
                        </p>
                    </div>

                    <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={toggleModalOpen}
                        >
                            Add a wave
                        </button>
                    </div>

                </div>
            </div>

            {sortedWaves.map(wave => {
                return (
                    <Wave key={wave.timestamp.toString()} wave={wave} />
                )
            })}

        </div>
    );
};

import { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NotificationContext } from '../contexts/NotificationContext';
import { ShowNotificationContext } from '../contexts/NotificationContext';
import { Pending } from './Notifications';

export default function Modal({ open, setOpen, wave }) {
    const [message, setMessage] = useState('');

    const { setNotificationContent } = useContext(NotificationContext);
    const { setShowNotification } = useContext(ShowNotificationContext);

    const handleChange = event => {
        event.preventDefault();
        setMessage(event.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitting form with message:', message);
        wave(message);
        setMessage('');
        setOpen(false);
        setNotificationContent(<Pending />);
        setShowNotification(true);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">

                            <div>
                                {/* <MessageInput /> */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <div className="mt-1">
                                        <form onSubmit={submitForm}>
                                            <input
                                                type="text"
                                                name="message"
                                                id="message"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 mb-2"
                                                placeholder="Your permanent message..."
                                                onChange={handleChange}
                                                value={message}
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm mb-2"
                                            >
                                                Add a wave
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 border border-indigo-600 text-indigo-600 font-medium hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm mb-2"
                                    onClick={() => setOpen(false)}
                                >
                                    Go back to dashboard
                                </button>
                            </div>

                        </Dialog.Panel>

                    </Transition.Child>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    );
};
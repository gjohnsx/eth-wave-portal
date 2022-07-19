import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeIcon, DotsVerticalIcon, FlagIcon, StarIcon, ShieldCheckIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

export default function Wave({ wave }) {
    console.log('\n inside WAVE:\nwave=', wave);
    console.log('wave.timestamp =', wave.timestamp, typeof wave.timestamp);

    return (
        <div className="bg-white px-4 py-5 sm:px-6 border-b border-indigo-100">
            <div className="flex space-x-3">
                <div className="flex-shrink-0">
                <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                </div>
                <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                    {wave.message}
                    </a>
                </p>
                <p className="text-sm text-gray-500">
                    <a href={wave.transaction} className="hover:underline" target="_blank">
                        {wave.timestamp.toString()}
                    </a>
                </p>
                </div>


                <div className="flex-shrink-0 self-center flex">
                <Menu as="div" className="relative z-30 inline-block text-left">
                    <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    </div>

                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                // href={wave.transaction}
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'flex px-4 py-2 text-sm'
                                )}
                            >
                                <ShieldCheckIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>View transaction</span>
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'flex px-4 py-2 text-sm'
                                )}
                            >
                                <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Embed</span>
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'flex px-4 py-2 text-sm'
                                )}
                            >
                                <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Report content</span>
                            </a>
                            )}
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                    </Transition>
                </Menu>
                </div>
            </div>
        </div>
    );
};
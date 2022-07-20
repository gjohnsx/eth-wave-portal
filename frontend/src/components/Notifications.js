import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { TailSpin } from 'react-loading-icons'
import { XIcon } from '@heroicons/react/solid'

export function Success({ hash }) {
    const [show, setShow] = useState(true);

    return (
        <>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
                show={show}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">Transaction successful!</p>
                        <p className="mt-1 text-sm text-gray-500">
                            View transaction on <a href={`https://goerli.etherscan.io/tx/${hash}`} target='_blank' rel='noreferrer' className='underline text-indigo-500 font-semibold'>etherscan</a>.
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setShow(false)
                        }}
                        >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </Transition>
        </>
    )
}

export function Pending({ hash }) {
    const [show, setShow] = useState(true);

    return (
        <>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
                show={show}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <TailSpin stroke='rgb(99, 102, 241)' speed={1.5} />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">Transaction pending</p>
                        <p className="mt-1 text-sm text-gray-500">Waiting for transaction confirmation...</p>
                    </div>
                    {/* <div className="ml-4 flex-shrink-0 flex">
                        <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setShow(false)
                        }}
                        >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div> */}
                    </div>
                </div>
                </div>
            </Transition>
        </>
    )
}

export function Failed({ reason }) {
    const [show, setShow] = useState(true);

    return (
        <>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
                show={show}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">Transaction failed</p>
                        <p className="mt-1 text-sm text-gray-500">
                            {reason.message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setShow(false)
                        }}
                        >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </Transition>
        </>
    )
}

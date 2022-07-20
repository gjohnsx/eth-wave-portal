import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline';
import { UserContext } from '../contexts/UserContext';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
    { 
        name: 'Your Profile', 
        href: '#',
        onclick: 'console.log(\'idk\')' 
    },
    { 
        name: 'Settings',
        href: '#',
        onclick: 'console.log(\'idk\')'
    },
    {  
        name: 'Sign out',
        href: '#',
        onclick: 'console.log(\'idk\')'
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

const Navbar = props => {
    const { currentUserData } = useContext(UserContext);

    const profileImg = props.currentAccount
        ? <img src={currentUserData.imageUrl} alt='user profile img' className='h-8 w-8 rounded-full' />
        : <UserCircleIcon className="block h-8 w-8"/>

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-indigo-600">
            {({ open }) => (
                <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            👋
                        </div>
                        {props.currentAccount && (
                            <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                    item.current
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                                ))}
                            </div>
                            </div>
                        )}

                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            <div>
                            <Menu.Button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">

                                <span className="sr-only">Open user menu</span>
                                { profileImg }

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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    <button
                                        className={classNames(
                                        'block px-4 py-2 text-sm',
                                        'text-indigo-500 hover:text-indigo-600'
                                        )}
                                        onClick={props.currentAccount ? props.disconnectWallet : props.connectWallet}
                                    >
                                        Sign {props.currentAccount ? 'out' : 'in'}
                                    </button>
                                </Menu.Item>

                                {/* {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                    <a
                                        href={item.href}
                                        className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                    )}
                                </Menu.Item>
                                ))} */}
                            </Menu.Items>
                            </Transition>
                        </Menu>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                        <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                            item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                            'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </Disclosure.Button>
                    ))}
                    </div>

                    <div className="pt-4 pb-3 border-t border-indigo-700">

                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={currentUserData.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">{currentUserData.name}</div>
                            <div className="text-sm font-medium text-indigo-300">{currentUserData.email}</div>
                        </div>
                        <button
                            type="button"
                            className="ml-auto bg-indigo-600 flex-shrink-0 p-1 border-2 border-transparent rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                        >
                            {item.name}
                        </Disclosure.Button>
                        ))}
                    </div>
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        </div>
    );
};

export default Navbar;
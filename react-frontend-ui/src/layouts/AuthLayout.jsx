import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, UserIcon, XMarkIcon} from '@heroicons/react/24/outline'

import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {Outlet, useLocation} from "react-router";
import {useAuthContext} from "../contexts/AuthContextProvider.jsx";
import axiosClient from "../axios-client.jsx";

const navigation = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Surveys', href: '/surveys'},
]

const userNavigation = [
    {name: 'Logout', href: '/logout'}
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AuthLayout() {

    const location = useLocation();
    const navigate = useNavigate();
    const {setCurrentUser, setUserToken, userToken, currentUser} = useAuthContext();

    if (!userToken) {
        return <Navigate to={'/login'}/>
    }


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/logout')
            if (response.data.success) {
                navigate('/dashboard');
                setUserToken(null);
                setCurrentUser(() => {})
            }
        } catch (e) {
            console.log('Logout Error:', e)
        }
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-100 text-gray-900 dark:bg-gray-800">
                    {({open}) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={() => classNames(
                                                            location.pathname === item.href
                                                                ? 'bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white'
                                                                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button
                                                        className="relative flex max-w-xs items-center rounded-full dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500">
                                                        <span className="absolute -inset-1.5"/>
                                                        <span className="sr-only">Open user menu</span>
                                                        <UserIcon
                                                            className="h-8 w-8 rounded-full text-gray-700 dark:text-gray-200"/>
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
                                                    <Menu.Items
                                                        className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 dark:text-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {() => (
                                                                    <button
                                                                        onClick={handleLogout}
                                                                        className={classNames(
                                                                            location.pathname === item.href ? 'bg-gray-100 darK:bg-gray-800' : '',
                                                                            'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 dark:bg-gray-700 hover:text-red-400'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="relative inline-flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 p-2 text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5"/>
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={() => classNames(
                                                location.pathname === item.href ? 'bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300' : 'bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon
                                                className="h-10 w-10 rounded-full text-gray-700 dark:text-gray-200"/>
                                        </div>
                                        <div className="ml-3">
                                            <div
                                                className="text-base font-medium leading-none text-gray-700 dark:text-white">{currentUser.name}</div>
                                            <div
                                                className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{currentUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        <Disclosure.Button
                                            as="button"
                                            onClick={handleLogout}
                                            className="w-full text-left block rounded-md px-3 py-2 text-base font-medium bg-gray-100 text-red-400 hover:text-gray-900 hover:bg-gray-200 dark:bg-gray-800  dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            Logout
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Outlet/>


            </div>
        </>
    )
}

import PropTypes from "prop-types";

{/* 1hr:50min paused video download/react + laravel rest api */}

export default function Page({title, children, createButton}) {
    return (
        <>
            <header className="sticky top-0 z-40 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-300 shadow dark:border-b dark:border-gray-800">
                <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {title}
                    </h1>
                    {
                       createButton && createButton
                    }
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    )
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    createButton: PropTypes.element
}


import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import PropTypes from "prop-types";

export default function PaginationLinks({meta, onPageChange}) {
    const onLinkChange = (en, link) => {
        en.preventDefault();
        if (!link.url) {
            return;
        }
        onPageChange(link)
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6 mt-10 mx-10">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={(ev) => onLinkChange(ev, meta.links[0])}
                    className={
                    `relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700
                     ${meta.current_page === 1 ? 'cursor-default text-gray-500':'cursor-pointer bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`
                    }
                >
                    Previous
                </a>
                <a
                    onClick={(ev) => onLinkChange(ev, meta.links[meta.links.length - 1])}
                    className={
                    `relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium
                    ${meta.last_page === meta.current_page ? 'cursor-default text-gray-500':'cursor-pointer bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`

                    }
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                        <span className="font-medium">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {meta.links && meta.links.map((link, index) => (
                            <button
                                onClick={(ev) => onLinkChange(ev, link)}
                                key={link.label}
                                aria-current="page"
                                disabled={link.active}
                                className={
                                `border relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:cyan-offset-2 focus-visible:outline-cyan-600
                                    ${index === meta.links.length - 1 ? ' rounded-r-md' :''}
                                    ${index === 0 ? ' rounded-l-md':''}
                                    ${(index === 0 && meta.current_page === 1) || (index === meta.links.length -1 && meta.current_page === meta.last_page)  || link.active ? ' cursor-default':' cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'}
                                    ${link.active ? 
                                    ' dark:border-gray-500 dark:bg-gray-700 bg-gray-100':
                                    ' border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'}
                                    `}
                            >
                                {index === 0 ? <ChevronLeftIcon className={'w-5'}/>  : index === meta.links.length - 1 ? <ChevronRightIcon className={'w-5'}/> : link.label}
                            </button>
                        ))}

                        {/*<a*/}
                        {/*    href="#"*/}
                        {/*    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"*/}
                        {/*>*/}
                        {/*    2*/}
                        {/*</a>*/}
                        {/*<span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">*/}
                        {/* ...*/}
                        {/*   </span>*/}
                    </nav>
                </div>
            </div>
        </div>
    )
}

PaginationLinks.propTypes = {
    meta: PropTypes.object,
    onPageChange: PropTypes.func
}


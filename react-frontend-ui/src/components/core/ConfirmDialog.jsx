import PropTypes from "prop-types";

export default function ConfirmDialog({message, title, type, setVisible, handleConfirm}) {
    const types = {
        danger: 'red',
        info: 'blue',
        warning: 'cyan'
    }
    return (
        <div id="alert-additional-content-2"
             className={`fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black bg-opacity-50`}
             role="alert">
            <div
                className={`p-4 text-${types[type]}-800 border border-${types[type]}-300 rounded-lg bg-${types[type]}-50 dark:bg-gray-800 dark:text-${types[type]}-400 dark:border-${types[type]}-800 max-w-sm`}>
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    {message}
                </div>
                <div className="flex justify-end">
                    <button type="button"
                            className={`me-2 text-${types[type]}-800 bg-transparent border border-${types[type]}-800 hover:bg-${types[type]}-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-${types[type]}-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-${types[type]}-600 dark:border-${types[type]}-600 dark:text-${types[type]}-500 dark:hover:text-white dark:focus:ring-${types[type]}-800`}
                            data-dismiss-target="#alert-additional-content-2" aria-label="Close"
                            onClick={() => {
                                setVisible(() => false)
                            }}
                    >Cancel</button>
                    <button type="button"
                            className={`text-white bg-${types[type]}-700 hover:bg-${types[type]}-900 focus:ring-4 focus:outline-none focus:ring-${types[type]}-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:bg-${types[type]}-600 dark:hover:bg-${types[type]}-800 dark:focus:ring-${types[type]}-800`}
                            onClick={() => {
                                setVisible(() => false)
                                handleConfirm();
                            }}
                    >Delete</button>
                </div>
            </div>
        </div>

    )
}

ConfirmDialog.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    setVisible: PropTypes.func,
    handleConfirm: PropTypes.func
}

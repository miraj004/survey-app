import PropTypes from "prop-types";
import {useState} from "react";

export default function ImageInput(props) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(() => e.target.result);
                props.onImageChange(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className="relative flex items-center justify-center w-full">
            <label htmlFor={props.id}
                   className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">

                    {selectedImage && (
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                             <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    {props.srcImage && (
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                             <img
                                src={props.srcImage}
                                alt="current image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className={`w-full absolute inset-0 flex flex-col items-center justify-center rounded-lg hover:text-gray-700 hover:bg-gray-200/80 dark:hover:text-gray-300 dark:hover:bg-gray-900/50 border-2 border-gray-300 border-dashed dark:border-gray-600${(props.srcImage || selectedImage)  ? ' text-transparent':''}`}>
                        <svg
                            className="w-8 h-8 mb-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs transition-colors">
                            SVG, PNG, JPG, or GIF (MAX. 800x400px)
                        </p>
                    </div>
                </div>
                <input id={props.id} type="file" className="hidden"
                       accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
                       onChange={handleImageChange}
                />
            </label>
        </div>
    )
}

ImageInput.defaultTypes = {
    srcImage: null
}


ImageInput.propTypes = {
    id: PropTypes.string.isRequired,
    srcImage: PropTypes.string,
    onImageChange: PropTypes.func,
}

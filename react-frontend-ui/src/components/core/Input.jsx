import {Label, TextInput} from "flowbite-react";
import PropTypes from 'prop-types'

export default function Input(props) {
    return (
        <div>
            {props.label && <div className="mb-2 block"><Label htmlFor={props.id} value={props.label}/></div>}
            <TextInput id={props.id} type={props.type} value={props.value} placeholder={props.placeholder} shadow onChange={props.handleChange}/>
            <span className={'error-span text-red-400 text-xs'} id={`${props.id}_error`}></span>
        </div>
    )
}

Input.defaultProps = {
    type: 'text'
}

Input.propTypes = {
    props: PropTypes.node,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    handleChange: PropTypes.func
}

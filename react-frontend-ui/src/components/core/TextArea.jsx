import {Label, Textarea} from "flowbite-react";
import PropTypes from "prop-types";

export default function TextArea(props) {
    return (
        <div>
            {props.label && <div className="mb-2 block">
                <Label htmlFor={props.id} value={props.label}/>
            </div>}
            <Textarea id={props.id} value={props.value} placeholder={props.placeholder} shadow
                      rows={props.rows}
                      className={'resize-none p-2'}
                      onChange={props.handleChange}/>
            {props.error && <span className={'text-xs text-red-400'}>{props.error}</span>}
        </div>
    )
}

TextArea.defaultProps = {
    rows: 4
}

TextArea.propTypes = {
    props: PropTypes.node,
    label: PropTypes.string,
    rows: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    handleChange: PropTypes.func
}

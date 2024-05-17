export function showErrors(errors, formId) {
    clearErrors();
    for (const fieldName in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, fieldName)) {
            const errorMessages = errors[fieldName];
            errorMessages.forEach(errorMessage => {
                const seperated = fieldName.split('.');
                const arrayValidationError = fieldName.includes('.');
                if (arrayValidationError) {
                    if (seperated.length >= 4) {
                        const [arrayName, index, options, optionIndex] = seperated;
                        const errorSpanSelector = `${arrayName}_${index}_${options}_${optionIndex}`;
                        const errorSpan = document.querySelector(`#${formId} #${arrayValidationError ? errorSpanSelector : fieldName}_error`);
                        if (errorSpan) {
                            errorSpan.textContent = errorMessage.replace(fieldName, arrayValidationError ? options : fieldName).replace('_', ' ');
                        }
                    } else {
                        const [arrayName, index, field] = seperated;
                        const errorSpanSelector = `${arrayName}_${index}_${field}`;
                        const errorSpan = document.querySelector(`#${formId} #${arrayValidationError ? errorSpanSelector : fieldName}_error`);
                        if (errorSpan) {
                            errorSpan.textContent = errorMessage.replace(fieldName, arrayValidationError ? field : fieldName).replace('_', ' ');
                        }
                    }
                } else {
                    const errorSpan = document.querySelector(`#${formId} #${fieldName}_error`);
                    if (errorSpan) {
                        errorSpan.textContent = errorMessage;
                    }
                }
            });
        }
    }
}

export function clearErrors() {
    const errorSpans = document.querySelectorAll('span.error-span');
    errorSpans.forEach(span => {
        span.textContent = '';
    });
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function reformatDate(inputDate) {
    const [year, month, day] = inputDate.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}
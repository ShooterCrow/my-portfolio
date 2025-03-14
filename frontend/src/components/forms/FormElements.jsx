import React from 'react'

export const Input1 = React.memo(({ label, type, value, func, placeholder, required = false }) => {
    return (
        <>
            <label className="contact-label">{label}</label>
            <input
                required={required}
                type={type}
                value={value}
                onChange={func}
                placeholder={placeholder}
                className="contact-input" />
        </>
    )
})

export const TextArea1 = React.memo(({ label, type, value, func, placeholder, required = false }) => {
    return (
        <>
            <label className="contact-label">{label}</label>
            <textarea
                value={value}
                onChange={func}
                required={required}
                placeholder={placeholder}
                className="contact-input textarea" />

        </>
    )
})
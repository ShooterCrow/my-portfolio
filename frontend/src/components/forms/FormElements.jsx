import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const Input1 = React.memo(({ label, type, value, func, placeholder, required = false }) => {
    return (
        <Flex w={"100%"} gap={"10px"} flexDir={"column"}>
            <label className="contact-label">
                <Text color={"whiteAlpha.800"} className='sec-text' fontWeight={"bold"}>[ {label} ]</Text>
            </label>
            <input
                required={required}
                type={type}
                value={value}
                onChange={func}
                placeholder={placeholder}
                className="contact-input" />
        </Flex>
    )
})

export const TextArea1 = React.memo(({ label, type, value, func, placeholder, required = false }) => {
    return (
        <Flex gap={"10px"} flexDir={"column"}>
            <label className="contact-label">
                <Text color={"whiteAlpha.800"} className='sec-text' fontSize={"18px"} fontWeight={"bold"}>[{label}]</Text>
            </label>
            <textarea
                value={value}
                onChange={func}
                required={required}
                placeholder={placeholder}
                className="contact-input textarea" />

        </Flex>
    )
})

export const Select1 = React.memo(({ label, options, value, func, required = false }) => {
    return (
        <Flex w={"100%"} gap={"10px"} flexDir={"column"}>
            <label className="contact-label">
                <Text textDecor={"uppercase"} color={"whiteAlpha.800"} className='sec-text' fontWeight={"bold"}>[ {label} ]</Text>
            </label>
            <select required={required} value={value} onChange={func} className="contact-input select">
                <option className='select'>Select an Option</option>
                {options?.map((option, index) => (
                    <option className='select' key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </Flex>
    );
});

export const Checkbox1 = React.memo(({ label, checked, func }) => {
    return (
        <Flex gap={"10px"} alignItems={"center"}>
            <input type="checkbox" checked={checked} onChange={func} className="contact-checkbox" />
            <label className="contact-label">
                <Text color={"whiteAlpha.800"} className='sec-text' fontWeight={"bold"}>[ {label} ]</Text>
            </label>
        </Flex>
    );
});

export const RadioGroup1 = React.memo(({ label, options, selectedValue, func }) => {
    return (
        <Flex w={"100%"} gap={"10px"} flexDir={"column"}>
            <Text color={"whiteAlpha.800"} className='sec-text' fontWeight={"bold"}>[ {label} ]</Text>
            {options.map((option, index) => (
                <Flex key={index} gap={"10px"} alignItems={"center"}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={func}
                        className="contact-radio"
                    />
                    <Text color={"whiteAlpha.800"}>{option.label}</Text>
                </Flex>
            ))}
        </Flex>
    );
});

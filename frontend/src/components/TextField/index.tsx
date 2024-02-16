import { FocusEventHandler, useState } from 'react';
import Input from '../Input';
import './TextField.scss';
import ValidMessage from '../ValidMessage';

interface TextField {
    name: string;
    hasError: boolean;
    label: string;
    placeholder: string;
    length: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 *
 * @param name : input 이름
 * @param hasError : 입력값이 유효하지 않은지 여부
 * @param label : label의 텍스트
 * @param placeholder : input의 placeholder
 * @param onChange : input change event 핸들러
 * @param length : 입력 값의 길이
 */
export default function TextField({
    name,
    hasError,
    label,
    placeholder,
    onChange,
    length,
}: TextField) {
    const onFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
        setFocused(true);
    };
    const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
        setFocused(false);
    };
    const [focused, setFocused] = useState(false);
    const textFieldColor = hasError && length > 0 ? 'red' : focused ? '#0FB3F0' : 'grey';
    return (
        <>
            <label className="textfield">
                <span
                    className="textfield-name"
                    style={{
                        color: textFieldColor,
                    }}
                >
                    {label}
                </span>
                <Input
                    placeholder={placeholder}
                    invalid={hasError && length > 0}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    name={name}
                    onChange={onChange}
                />
                <ValidMessage name={name} focused={focused} hasError={hasError} length={length} />
            </label>
        </>
    );
}

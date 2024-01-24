import { FocusEventHandler, useState } from 'react';
import Input from '../Input';
import './TextField.scss';

interface TextField {
    name: string;
    hasError?: boolean;
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({ name, hasError, label, placeholder, onChange }: TextField) {
    //TODO input에 타자를 입력하는 순간 validCheck 발동
    const onFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
        setFocused(true);
    };
    const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
        setFocused(false);
    };
    const [focused, setFocused] = useState(false);
    const textFieldColor = hasError ? 'red' : focused ? '#0FB3F0' : 'grey';
    return (
        //TODO focus 시 label,input, errorMessage 컬러 변경
        //TODO hasError 시 label, input, errorMessage 컬러 변경
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
                    invalid={hasError}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    name={name}
                    onChange={onChange}
                />
                {focused && hasError && (
                    <b className="textfield-message-error">올바르지 않은 형식입니다.</b>
                )}
            </label>
        </>
    );
}

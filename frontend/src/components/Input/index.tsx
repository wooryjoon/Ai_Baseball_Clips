import './Input.scss';

type Input = {
    placeholder: string;
    invalid: boolean | undefined;
    onFocus: any;
    onBlur: any;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * input을 감싸는 컴포넌트
 * @param {object} props props의 하위 요소는 다음과 같습니다.
 * @param {string} props.placeholder input 태그의 placeholder
 * @param {boolean} props.invalid 올바른 input값이 입력 되었는지 판단
 */

export default function Input({
    placeholder = 'default',
    invalid = false,
    onFocus,
    onBlur,
    name,
    onChange,
}: Input) {
    return (
        <input
            className="input"
            placeholder={placeholder}
            aria-invalid={invalid}
            onFocus={onFocus}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            type={name === 'password' ? 'password' : 'text'}
        ></input>
    );
}

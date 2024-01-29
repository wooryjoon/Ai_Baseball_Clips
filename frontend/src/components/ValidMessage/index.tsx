interface ValidMessage {
    hasError: boolean;
    name: string;
    focused: boolean;
    length: number;
}

export default function ValidMessage({ name, focused, hasError, length }: ValidMessage) {
    let className = 'textfield-message';
    let text = '';
    if (name == 'password') {
        if (focused && length) {
            if (hasError) {
                text = '숫자와 문자를 조합한 8자리 이상 20자리 이하';
                className = className + ' error';
            } else text = '올바른 형식입니다.';
        }
    } else if (name == 'email') {
        if (focused && length) {
            if (hasError) {
                text = '올바르지 않은 이메일 형식입니다.';
                className = className + ' error';
            } else text = '올바른 형식입니다.';
        }
    }
    return <b className={className}>{text}</b>;
}

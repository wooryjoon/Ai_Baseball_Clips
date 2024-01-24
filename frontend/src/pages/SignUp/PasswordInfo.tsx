export default function PasswordInfo({ isCorrect }: any) {
    let className = 'password-info';
    if (isCorrect) className = className + ' correct';

    return (
        <div className={className}>
            <span>비밀번호는 다음을 반드시 포함해야 합니다.</span>
            <span
                style={{
                    color: isCorrect ? '#0FB3F0' : 'gray',
                }}
            >
                숫자와 문자를 조합한 8자리 이상 20자리 이하
            </span>
        </div>
    );
}

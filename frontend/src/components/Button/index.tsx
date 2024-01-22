import './Button.scss';
/**
 * @file <공통 컴포넌트> Button
 * @param className 버튼 유형에 따라 className 지정
 */

export default function Button({ styleType, disabled, onClick, children }: any) {
    let className = 'button';
    if (styleType) className = ` ${className} + styleType`;
    if (disabled) className = ` ${className} + disabled`;
    return (
        <button className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

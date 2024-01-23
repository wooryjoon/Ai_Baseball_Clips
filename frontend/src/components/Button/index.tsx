import './Button.scss';
/**
 * @file <공통 컴포넌트> Button
 * @param styleType 어디에 쓰이는 버튼이냐에 따라 className 유동적 변경
 * @param disabled 버튼 기능을 막아야 할 때 'disabled' 라는 string 값을 받아옴
 * @param onClick 클릭 이벤트 함수를 받는다.
 * @param children button 내부에 들어갈 text를 받는다.
 *
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

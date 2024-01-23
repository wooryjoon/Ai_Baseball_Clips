import './Input.scss';
type Input = {
    placeholder: string;
    invalid: boolean;
};
export default function Input({ placeholder, invalid }: Input) {
    return <input className="input" aria-invalid={invalid} placeholder={placeholder}></input>;
}

import './index.scss';

interface ButtonProps {
    className?: string;
    text?: number | string;
    value?: string | number;
    disabled?: boolean;
    onClick?(): void;
}
const Button = ({
    text = 'No text',
    value,
    className,
    disabled,
    onClick,
}: ButtonProps): JSX.Element => {
    return (
        <button disabled={disabled} onClick={onClick} value={value} className={className}>
            {text}
        </button>
    );
};

export default Button;

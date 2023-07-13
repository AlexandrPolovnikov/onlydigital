import { COLOR_TYPES } from '../../lib/constants.enum';
import './index.scss';

interface ButtonProps {
    className?: string;
    type?: COLOR_TYPES;
    text?: number | string;
    value?: string | number;
    disabled?: boolean;
    onClick?(): void;
}

const getColor = (type: COLOR_TYPES | undefined): string => {
    switch (type) {
        case COLOR_TYPES.info:
            return 'info';

        case COLOR_TYPES.danger:
            return 'danger';

        default:
            return 'default';
    }
};

const Button = ({
    text = 'No text',
    type,
    value,
    className,
    disabled,
    onClick,
}: ButtonProps): JSX.Element => {
    return (
        <button
            className={`button text ${className} ${getColor(type)}`}
            disabled={disabled}
            value={value}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

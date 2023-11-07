import { FC, ReactNode } from 'react';

interface IButton {
	onClick: () => void;
	children: ReactNode;
	disabled?: boolean;
}

const Button: FC<IButton> = ({ onClick, children, disabled = false }) => {
	return (
		<button onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;

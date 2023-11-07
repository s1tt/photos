import cn from 'classnames';
import { FC, useContext } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import styles from './Loader.module.css';

type Loader = {
	className?: string;
};

const Loader: FC<Loader> = ({ className }) => {
	const { isLoading } = useContext(IsLoadingContext);
	return (
		<>
			{isLoading && (
				<div className={cn(styles.wrapper, className)}>
					<div className={styles.loader}></div>
				</div>
			)}
		</>
	);
};

export default Loader;

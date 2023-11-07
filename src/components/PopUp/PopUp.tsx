import { useContext } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import { PopUpContext } from '../../contexts/PopUp.context';
import Loader from '../Loader/Loader';
import styles from './PopUp.module.css';

const PopUp = () => {
	const { isPopUpOpened, setIsPopUpOpened, cardData } =
		useContext(PopUpContext);
	const { isLoading } = useContext(IsLoadingContext);

	if (isLoading && isPopUpOpened && !cardData) {
		return (
			<div className={styles['loader-wrapper']}>
				<Loader />
			</div>
		);
	}
	return (
		<>
			{isPopUpOpened && cardData && (
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<figure className={styles['wrapper-img']}>
							<img
								className={styles.img}
								src={cardData.urls.full}
								alt={cardData.alt_description}
							/>
							<figcaption>
								Author: {cardData.user.first_name} {cardData.user.last_name}
							</figcaption>
						</figure>

						<div className={styles.description}>
							<p className={styles.text}>
								Author: {cardData.user.first_name} {cardData.user.last_name}
							</p>
							<p className={styles.text}>
								Description: {cardData.alt_description}
							</p>
							<p>
								Created date: {new Date(cardData.created_at).toLocaleString()}
							</p>
						</div>
						<button onClick={() => setIsPopUpOpened(false)}>Close</button>
					</div>
				</div>
			)}
		</>
	);
};

export default PopUp;

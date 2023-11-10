import axios from 'axios';
import { FC, useContext, useEffect, useReducer } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import { PopUpContext } from '../../contexts/PopUp.context';
import { cardReducer } from '../../states/card.reducer';
import { TOKEN, URL } from '../../utils/constants';
import Button from '../Button/Button';
import styles from './Card.module.css';

interface ICard {
	src: string;
	alt: string;
	likes: number;
	id: string;
	isLiked: boolean;
}

const Card: FC<ICard> = ({ src, alt, likes, isLiked, id }) => {
	const { setIsLoading } = useContext(IsLoadingContext);
	const { setIsPopUpOpened, setCardId } = useContext(PopUpContext);
	const [{ likesState, isLikedState }, dispatch] = useReducer(cardReducer, {
		likesState: likes,
		isLikedState: isLiked
	});

	useEffect(() => {
		updateCard({ likesState: likes, isLikedState: isLiked });
	}, [likes, isLiked]);

	const updateCard = (newData: {
		likesState: number;
		isLikedState: boolean;
	}) => {
		dispatch({ type: 'UPDATE_CARD', payload: newData });
	};

	const likePhoto = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post(`${URL}/photos/${id}/like`, null, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
			res.data.photo && dispatch({ type: 'LIKE' });
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const unlikePhoto = async () => {
		try {
			setIsLoading(true);
			const res = await axios.delete(`${URL}/photos/${id}/like`, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
			res.data.photo && dispatch({ type: 'UNLIKE' });
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const openPopUp = () => {
		setIsPopUpOpened(true);
		setCardId(id);
	};

	return (
		<article className={styles.card}>
			<div className={styles['img-wrapper']} onClick={openPopUp}>
				<img src={src} alt={alt} />
			</div>
			<p>Likes: {likesState}</p>
			<div className={styles.buttons}>
				<Button onClick={likePhoto} disabled={isLikedState}>
					Like
				</Button>
				<Button onClick={unlikePhoto} disabled={!isLikedState}>
					Unlike
				</Button>
			</div>
		</article>
	);
};

export default Card;

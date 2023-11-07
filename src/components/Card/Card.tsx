import axios from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import { PopUpContext } from '../../contexts/PopUp.context';
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
	const [likesState, setLikesState] = useState<number>(likes);
	const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setIsPopUpOpened, setCardId } = useContext(PopUpContext);

	useEffect(() => {
		setLikesState(likes);
	}, [likes]);

	const likePhoto = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post(`${URL}/photos/${id}/like`, null, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
			setLikesState(res.data.photo.likes);
			setIsLikedState(res.data.photo.liked_by_user);
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
			setLikesState(res.data.photo.likes);
			setIsLikedState(res.data.photo.liked_by_user);
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

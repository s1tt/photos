import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Photo from '../../components/Photo/Photo';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import { PhotoData } from '../../types';
import { TOKEN, URL } from '../../utils/constants';
import styles from './RandomPhoto.module.css';

const RandomPhoto = () => {
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setIsLoading } = useContext(IsLoadingContext);
	// const { setPhotoData } = useContext(PhotoDataContext);
	const [photoData, setPhotoData] = useState<PhotoData | null>(null);

	const fetchingPhotoData = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(`${URL}/photos/random`, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
			const newData = res.data;
			setPhotoData(newData);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}, [setPhotoData, setIsLoading]);

	useEffect(() => {
		fetchingPhotoData();
	}, [fetchingPhotoData]);

	return (
		<>
			<Outlet />
			<section className={styles.content}>
				<h1>Random Photo</h1>
				<Button onClick={fetchingPhotoData}>Generate random photo</Button>
				<Photo photoData={photoData} setPhotoData={setPhotoData} />
			</section>
		</>
	);
};

export default RandomPhoto;

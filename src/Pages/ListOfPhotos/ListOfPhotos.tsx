import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { IsLoadingContext } from '../../contexts/IsLoading.context';
import { PhotoData } from '../../types';
import { TOKEN, URL } from '../../utils/constants';
import styles from './ListOfPhotos.module.css';

const ListOfPhotos = () => {
	const [list, setList] = useState<PhotoData[]>([]);
	const { setIsLoading } = useContext(IsLoadingContext);

	const fetchList = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`${URL}/photos?page=1&per_page=9&order_by=popular`,
				{
					headers: {
						Authorization: `Bearer ${TOKEN}`
					}
				}
			);
			setList(res.data);
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading]);

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	return (
		<>
			<Outlet />
			<h1>Top Photos</h1>
			<div className={styles.list}>
				{list.length !== 0 &&
					list.map(item => (
						<Card
							key={item.id}
							id={item.id}
							src={item.urls.small_s3}
							alt={item.alt_description}
							likes={item.likes}
							isLiked={item.liked_by_user}
						/>
					))}
			</div>
		</>
	);
};

export default ListOfPhotos;

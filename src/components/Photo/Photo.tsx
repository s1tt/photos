import { FC, useEffect } from 'react';
import { PhotoData } from '../../types';
import Card from '../Card/Card';

const Photo: FC<{
	fetchingPhotoData: () => void;
	photoData: PhotoData | null;
	setPhotoData: (photoData: PhotoData) => void;
}> = ({ fetchingPhotoData, photoData }) => {
	useEffect(() => {
		fetchingPhotoData();
	}, [fetchingPhotoData]);

	return (
		<>
			{photoData && (
				<div>
					<Card
						src={photoData.urls.small_s3}
						alt={photoData.alt_description}
						likes={photoData.likes}
						id={photoData.id}
						isLiked={photoData.liked_by_user}
					/>
				</div>
			)}
		</>
	);
};

export default Photo;

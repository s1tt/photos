import { FC } from 'react';
import { PhotoData } from '../../types';
import Card from '../Card/Card';

const Photo: FC<{
	photoData: PhotoData | null;
	setPhotoData: (photoData: PhotoData) => void;
}> = ({ photoData }) => {
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

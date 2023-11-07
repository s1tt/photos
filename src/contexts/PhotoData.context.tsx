import { FC, ReactNode, createContext, useState } from 'react';
import { PhotoData } from '../types';
export const PhotoDataContext = createContext<IPhotoDataContext>(
	{} as IPhotoDataContext
);

interface IPhotoDataContext {
	photoData: PhotoData;
	setPhotoData: (photoData: PhotoData) => void;
}

interface IPhotoDataContextProvider {
	children: ReactNode;
}

const PhotoDataContextProvider: FC<IPhotoDataContextProvider> = ({
	children
}) => {
	const [photoData, setPhotoData] = useState<PhotoData>(
		JSON.parse(localStorage.getItem('data') as string) || null
	);
	return (
		<PhotoDataContext.Provider value={{ photoData, setPhotoData }}>
			{children}
		</PhotoDataContext.Provider>
	);
};

export default PhotoDataContextProvider;

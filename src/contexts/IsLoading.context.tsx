import { FC, ReactNode, createContext, useState } from 'react';

interface IIsLoading {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
}

export const IsLoadingContext = createContext({} as IIsLoading);

const IsLoadingContextProvider: FC<{ children: ReactNode }> = ({
	children
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</IsLoadingContext.Provider>
	);
};

export default IsLoadingContextProvider;

import axios from 'axios';
import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import { PhotoData } from '../types';
import { TOKEN, URL } from '../utils/constants';
import { IsLoadingContext } from './IsLoading.context';

interface IPopUpContext {
	isPopUpOpened: boolean;
	setIsPopUpOpened: (isPopUpOpened: boolean) => void;
	setCardId: (cardId: string) => void;
	cardData: PhotoData | null;
}

export const PopUpContext = createContext({} as IPopUpContext);

const PopUpContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
	const [cardId, setCardId] = useState<string>('');
	const [cardData, setCardData] = useState<PhotoData | null>(null);
	const { setIsLoading } = useContext(IsLoadingContext);

	const fetchCardData = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(`${URL}/photos/${cardId}`, {
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
			});
			setCardData(res.data);
		} catch (e) {
			setIsPopUpOpened(false);
			console.log(e);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	}, [cardId, setIsLoading]);

	useEffect(() => {
		if (!isPopUpOpened) {
			setCardData(null);
		}
	}, [isPopUpOpened]);

	useEffect(() => {
		if (isPopUpOpened && cardId) {
			fetchCardData();
		}
	}, [isPopUpOpened, cardId, fetchCardData]);

	return (
		<PopUpContext.Provider
			value={{ isPopUpOpened, setIsPopUpOpened, setCardId, cardData }}
		>
			{children}
		</PopUpContext.Provider>
	);
};

export default PopUpContextProvider;

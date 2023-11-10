import React from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PopUp from './components/PopUp/PopUp';
import { router } from './components/routes';
import IsLoadingContextProvider from './contexts/IsLoading.context';
import PhotoDataContextProvider from './contexts/PhotoData.context';
import PopUpContextProvider from './contexts/PopUp.context';
import './index.css';
const popupContentEl = document.getElementById('popup');
const loaderContentEl = document.getElementById('loader');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<IsLoadingContextProvider>
			<PhotoDataContextProvider>
				<PopUpContextProvider>
					<RouterProvider router={router} />
					{createPortal(<PopUp />, popupContentEl as HTMLElement)}
					{createPortal(<Loader />, loaderContentEl as HTMLElement)}
				</PopUpContextProvider>
			</PhotoDataContextProvider>
		</IsLoadingContextProvider>
	</React.StrictMode>
);

import { createBrowserRouter, Navigate } from 'react-router-dom';
import ListOfPhotos from '../../Pages/ListOfPhotos/ListOfPhotos';
import RandomPhoto from '../../Pages/RandomPhoto/RandomPhoto';
import Navbar from '../Navbar/Navbar';

export const router = createBrowserRouter([
	{
		path: '/random',
		element: <RandomPhoto />,
		children: [
			{
				path: '/random',
				element: <Navbar />
			}
		]
	},
	{
		path: '/top',
		element: <ListOfPhotos />,
		children: [
			{
				path: '/top',
				element: <Navbar />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to={'/random'} />
	}
]);

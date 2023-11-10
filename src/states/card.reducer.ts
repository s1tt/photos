interface State {
	likesState: number;
	isLikedState: boolean;
}

interface Action {
	type: 'LIKE' | 'UNLIKE' | 'UPDATE_CARD';
	payload?: State;
}

export const cardReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'LIKE':
			return {
				likesState: state.likesState + 1,
				isLikedState: true
			};
		case 'UNLIKE':
			return {
				likesState: state.likesState - 1,
				isLikedState: false
			};
		case 'UPDATE_CARD':
			return {
				...state,
				...action.payload
			};
	}
};

import { Constants, Location } from "./types";
import { RootState, ActionTypes } from './types'
// import { RootState, ActionTypes } from 'src/store/types'
// import { } from 'src/store/types'

const defaultLocation: Location = {
  Key: "215854",
  LocalizedName: "Tel Aviv",
  isDefault: true,
};

const init: RootState = {
  listFavorites: [],
  them: "dark",
  itemSelected: defaultLocation,
};

export function rootReducer(state: RootState = init, action: ActionTypes): RootState {
  console.log("🚀 ~ file: reducers.ts ~ line 17 ~ rootReducer ~ action", action)
  switch (action.type) {
    case Constants.SELECT_ITEM:
      return { ...state, itemSelected: action.payload.item };
    case Constants.TOGGLE_THEME:
      return { ...state, them: state.them === "dark" ? "light" : "dark" };
    case Constants.FETCH_DATA_SUCCESS:
      return { ...state, selectedInfo: action.payload.data };
    case Constants.ADD_ITEM_TO_FAVORITES:
      return {
        ...state,
        listFavorites: [...state.listFavorites, action.payload.key]
      }
    case Constants.REMOVE_ITEM_FROM_FAVORITES:
      return {
        ...state,
        listFavorites: state.listFavorites.filter(
          (el) => el !== action.payload.key
        ),
      };
    default:
      return state;
  }
}

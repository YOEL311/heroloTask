import { Constants, Location } from "../types";
import { ActionTypes, PreferUserState } from '../types'

const defaultLocation: Location = {
    Key: "215854",
    LocalizedName: "Tel Aviv",
    isDefault: true,
};

const init: PreferUserState = {
    listFavorites: [],
    them: "dark",
    itemSelected: defaultLocation,
};

export function preferUserReducer(state: PreferUserState = init, action: ActionTypes): PreferUserState {
    console.log("🚀 ~ file: reducers.ts ~ line 17 ~ rootReducer ~ action", action)
    switch (action.type) {
        case Constants.SELECT_ITEM:
            return { ...state, itemSelected: action.payload.item };
        case Constants.TOGGLE_THEME:
            return { ...state, them: state.them === "dark" ? "light" : "dark" };
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

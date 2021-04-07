import { Constants } from "../types";
import { ActionTypes, DataState } from '../types'

export function dataReducer(state: DataState = {}, action: ActionTypes): DataState {
    switch (action.type) {
        case Constants.FETCH_DATA_SUCCESS:
            return { ...state, selectedInfo: action.payload.data };
        default:
            return state;
    }
}

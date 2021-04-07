

import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { PaletteType } from '@material-ui/core';

export enum Constants {
    ADD_ITEM_TO_FAVORITES = 'ADD_ITEM_TO_FAVORITES',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    SELECT_ITEM = 'SELECT_ITEM',
    REMOVE_ITEM_FROM_FAVORITES = 'REMOVE_ITEM_FROM_FAVORITES',
    TOGGLE_THEME = 'TOGGLE_THEME',
}

export interface Location {
    Key: string,
    LocalizedName: string,
    isDefault?: boolean,
}
export interface RootState {
    preferUser: PreferUserState
    data: DataState
}
export interface PreferUserState {
    listFavorites: string[];
    them: PaletteType;
    itemSelected: Location
}


export interface DataState {
    selectedInfo?: any
}


export type ActionTypes = ActionType<typeof actions>;
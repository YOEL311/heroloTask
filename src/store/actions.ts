import { Constants, Location, RootState } from "./types";
import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { myFetch } from '../common/fetchManager'

function toggleTheme() {
  return action(Constants.TOGGLE_THEME);
}

function addToFavorites(key: string) {
  return action(Constants.ADD_ITEM_TO_FAVORITES, {
    key,
  });
}

export function selectItem2(item: Location) {
  return action(Constants.SELECT_ITEM, {
    item
  });
}

function removeFromFavorites(key: string) {
  return action(Constants.REMOVE_ITEM_FROM_FAVORITES, {
    key
  });
}

export const fetchData = async (dispatch: Dispatch, key: string) => {
  const res = await myFetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}`
  );
  fetchDataSuccess(dispatch, res);
}

export const selectItem = (item: Location) => {
  return async (dispatch: Dispatch, getstate: () => RootState) => {
    dispatch(action(Constants.SELECT_ITEM, { item }))
    dispatch(fetchSelectedData() as any)
  }
}

export const fetchSelectedData = () => {
  return async (dispatch: Dispatch, getstate: () => RootState) => {
    const key = getstate().preferUser.itemSelected.Key
    const res = await myFetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}`
    );
    fetchDataSuccess(dispatch, res);
  }
}

function fetchDataSuccess(dispatch: Dispatch, data: any) {
  return dispatch(
    action(Constants.FETCH_DATA_SUCCESS, {
      data
    })
  )
}


export { toggleTheme, addToFavorites, removeFromFavorites, fetchDataSuccess };
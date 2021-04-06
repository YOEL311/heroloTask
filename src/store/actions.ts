import { Constants, Location } from "./types";
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

function selectItem(item: Location) {
  return action(Constants.SELECT_ITEM, {
    item
  });
}

function selectItem2(item: Location) {
  // return async (dispatch: Dispatch) => {
  // fetchData2(item.Key);
  // };
}

function removeFromFavorites(key: string) {
  return action(Constants.REMOVE_ITEM_FROM_FAVORITES, {
    key
  });
}


export const fetchData = (key: string) => {
  return async (dispatch: Dispatch) => {
    const res = await myFetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}`
    );
    fetchDataSuccess(dispatch, res);
  };
}



export const fetchData2 = (key: string) => {
  console.log("🚀 ~ file: actions.ts ~ line 30 ~ fetchData ~ key", key)
  return async (dispatch: Dispatch) => {
    dispatch(action(Constants.SELECT_ITEM, { item: key }))
    const res = await myFetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}`
    );
    console.log("🚀 ~ file: actions.ts ~ line 35 ~ return ~ res", res)
    fetchDataSuccess(dispatch, res);
  };
}


function fetchDataSuccess(dispatch: Dispatch, data: any) {
  console.log("🚀 ~ file: actions.ts ~ line 59 ~ fetchDataSuccess ~ data", data)
  return dispatch(
    action(Constants.FETCH_DATA_SUCCESS, {
      data
    })
  )
}


export { toggleTheme, addToFavorites, removeFromFavorites, selectItem, fetchDataSuccess };
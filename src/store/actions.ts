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

function selectItem2(item: Location) {
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
    // console.log("🚀 ~ file: actions.ts ~ line 55 ~ return ~ state", getstate())
    dispatch(action(Constants.SELECT_ITEM, { item }))
    console.log("🚀 ~ file: actions.ts ~ line 55 ~ return ~ state", getstate().preferUser.itemSelected.Key)
    const key = getstate().preferUser.itemSelected.Key
    key && fetchData(dispatch, key)
  }
}

function fetchDataSuccess(dispatch: Dispatch, data: any) {
  console.log("🚀 ~ file: actions.ts ~ line 59 ~ fetchDataSuccess ~ data", data)
  return dispatch(
    action(Constants.FETCH_DATA_SUCCESS, {
      data
    })
  )
}


export { toggleTheme, addToFavorites, removeFromFavorites, fetchDataSuccess, selectItem2 };
// import React from "react";
import React, { Component } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  addToFavorites,
  removeFromFavorites,
  selectItem,
  fetchData2,
} from "../store/actions";
import { RootState } from "../store/types";

import { toast } from "react-toastify";

import { getDayString, getPosition } from "../common/helper";
import SelectLocation from "./SelectLocation";
import { myFetch } from "../common/fetchManager";

const URL_ICON = process.env.PUBLIC_URL + "/icons/";

const Weather = () => {
  const selected = useSelector(
    (state: RootState) => state.preferUser.itemSelected
  );
  console.log(
    "🚀 ~ file: Weather.tsx ~ line 34 ~ Weather ~ selected",
    selected
  );
  const selectedInfo = useSelector(
    (state: RootState) => state.data.selectedInfo
  );
  console.log(
    "🚀 ~ file: Weather.tsx ~ line 31 ~ Weather ~ selectedInfo",
    selectedInfo
  );
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   selected?.Key&&dispatch(fetchData(selected?.Key))
  //  }, [selected])
  // //TODO:

  React.useEffect(() => {
    // const tryGetLoc = async () => {
    //   if (selected.isDefault) {
    //     try {
    //       const position = await getPosition() as GeolocationPosition ;
    //       const res = await myFetch(
    //         `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}`
    //       );
    //       res?.Key &&
    //         dispatch(
    //           selectItem({ Key: res.Key, LocalizedName: res.LocalizedName })
    //           // fetchData2(res.Key)
    //         );
    //     } catch (error) {
    //       toast.error("can't get your location");
    //     }
    //   }
    // };
    // tryGetLoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listFavorites = useSelector(
    (state: RootState) => state.preferUser.listFavorites
  );

  const isSelectedFavorite = listFavorites?.some(
    (item) => item === selected?.Key
  );

  return (
    <div>
      <Grid
        container
        alignContent="center"
        justify={"center"}
        alignItems="center"
        direction="column"
      >
        <SelectLocation />
        <Container>
          <Card style={{ marginTop: 50, padding: 40 }}>
            {selectedInfo && (
              <>
                <Grid
                  direction="row"
                  justify="space-between"
                  container
                  style={{ marginTop: 40 }}
                >
                  <Grid>
                    <Typography align={"center"} variant="h6" color="primary">
                      {selected?.LocalizedName}
                    </Typography>

                    <Typography align={"center"} variant="h6" color="primary">
                      {`${selectedInfo?.DailyForecasts[0]?.Temperature.Minimum.Value} -
                      ${selectedInfo?.DailyForecasts[0]?.Temperature.Maximum.Value}
                      ${selectedInfo?.DailyForecasts[0]?.Temperature.Maximum.Unit}°`}
                    </Typography>
                  </Grid>
                  <IconButton
                    onClick={() => {
                      isSelectedFavorite
                        ? dispatch(removeFromFavorites(selected.Key))
                        : dispatch(addToFavorites(selected.Key));
                    }}
                  >
                    <FavoriteIcon
                      fontSize="large"
                      color={isSelectedFavorite ? "primary" : "disabled"}
                    />
                  </IconButton>
                </Grid>
                <Typography align="center" variant="h4" color="primary">
                  {selectedInfo.Headline.Text}
                </Typography>
                <Grid
                  container
                  justify="space-evenly"
                  style={{
                    marginTop: 100,
                    marginBottom: 100,
                  }}
                  direction="row"
                >
                  {selectedInfo.DailyForecasts?.map(
                    (day: {
                      EpochDate: React.Key | null | undefined;
                      Date: any;
                      Day: {
                        IconPhrase:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        Icon: any;
                      };
                    }) => {
                      return (
                        <Card key={day.EpochDate}>
                          <CardContent>
                            <Typography color="primary" gutterBottom>
                              {getDayString(day.Date)}
                            </Typography>
                            <Typography color="primary" gutterBottom>
                              {day.Day.IconPhrase}
                            </Typography>
                            <img
                              src={`${URL_ICON}${day.Day.Icon}-s.png`}
                              alt="logo"
                            />
                          </CardContent>
                        </Card>
                      );
                    }
                  )}
                </Grid>
              </>
            )}
          </Card>
        </Container>
      </Grid>
    </div>
  );
};

export default Weather;

import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { RootState } from "../store/types";
import { myFetch } from "../common/fetchManager";
import { getCityName } from "../common/helper";

const Favorites = () => {
  const listFavorites = useSelector(
    (state: RootState) => state.preferUser.listFavorites
  );
  const [listFavoritesInfo, setListFavoritesInfo] = React.useState<string[]>(
    []
  );
  console.log(
    "🚀 ~ file: Favorites.tsx ~ line 17 ~ Favorites ~ listFavoritesInfo",
    listFavoritesInfo
  );

  React.useEffect(() => {
    const fetchInfo = () => {
      listFavorites.map(async (el) => {
        const res = await myFetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${el}?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}`
        );
        res && setListFavoritesInfo((prev: any) => [...prev, res[0]]);
      });
    };
    listFavorites[0] && fetchInfo();
    console.log(
      "🚀 ~ file: Favorites.tsx ~ line 38 ~ React.useEffect ~ listFavorites",
      listFavorites
    );
  }, [listFavorites]);

  return (
    <Grid>
      <Container>
        <Card style={{ marginTop: 50, padding: 40 }}>
          <Grid direction="row" container justify="space-evenly">
            {listFavoritesInfo[0] &&
              listFavoritesInfo.map((favorite: any) => {
                return (
                  <Card key={favorite.Link}>
                    <CardContent>
                      <Typography
                        align="center"
                        variant="h5"
                        color="primary"
                        gutterBottom
                      >
                        {getCityName(favorite.Link)}
                        {/* {favorite.Link.split("/")[5]} */}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        color="primary"
                        gutterBottom
                      >
                        {favorite.Temperature.Metric.Value} F °
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        color="primary"
                        gutterBottom
                      >
                        {favorite.WeatherText}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </Grid>
        </Card>
      </Container>
    </Grid>
  );
};

export default Favorites;

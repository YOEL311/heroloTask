import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { selectItem ,fetchData2} from "../store/actions";
import { Location } from "../store/types";
import { myFetch } from "../common/fetchManager";

const useStyles = makeStyles((theme) => ({
  selector: {
    width: 1000,
    [theme.breakpoints.down("lg")]: {
      width: 600,
    },
    [theme.breakpoints.down("md")]: {
      width: 400,
    },
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
}));

export default function SelectLocation() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const dispatch = useDispatch();

  const loading = open && options.length === 0;
  const classes = useStyles();

  const onChangeHandle = async (value: string) => {
    const res = await myFetch(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCU_WEATHER_API_KEY}&q=${value}`
    );
    res && setOptions(res);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      className={classes.selector}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option:Location) => option.LocalizedName}
      options={options}
      loading={loading}
      onChange={(e, selected) => {
        selected?.Key &&
          dispatch(
            fetchData2(selected.Key)

            // selectItem({
            //   Key: selected.Key,
            //   LocalizedName: selected.LocalizedName,
            // })
          );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select city"
          variant="outlined"
          onChange={(ev) => {
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

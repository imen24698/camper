import React, { useState, useEffect } from "react";
import { GiCampfire } from "react-icons/gi";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import data from "../../components/ProductSection/data";

const Navbar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, []);

  useEffect(() => {
    if (value) {
      localStorage.setItem("tag", value.tag);
    }
  }, [value]);

  return (
    <nav className={classes.nav}>
      <div className={classes.title} onClick={() => props.history.push("/")}>
        <GiCampfire className={classes.logo} />
        <h1 className={classes.titleText}>Camper</h1>
      </div>

      <div className={classes.searchBoxContainer}>
        <Autocomplete
          options={list}
          getOptionLabel={(list) => list.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type item here..."
              //variant="outlined"
              className={classes.searchBox}
            />
          )}
          onChange={(e) =>
            setValue(list.filter((el) => e.target.innerHTML === el.name)[0])
          }
        />
        <SearchIcon
          className={classes.searchIcon}
          onClick={() =>
            value ? props.history.push(`/product/${value.id}`) : ""
          }
        />
      </div>

      <Link to="/auth" className={classes.icon}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;

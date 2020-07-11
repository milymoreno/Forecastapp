/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "./Wrapper";
import { getCities } from "../../services/Forecast.service";
import "../../css/infiniteSelect.css";

const useStyles = makeStyles(theme => ({
  label: {
    display: "block"
  },
  input: {
    width: 300
  },
  loadingSpan:{

  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    maxHeight: "auto",
    border: "1px solid rgba(0,0,0,.25)",
    overflow: "hidden",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer"
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white"
    }
  }
}));

export default function UseAutocomplete() {
  const classes = useStyles();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const findCity = (cant) => {
    let response = [];
    cant = cant ? cant : 0;
    response = getCities ? getCities.filter(o => !inputValue || o.name.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0).slice(0, cant + 30) : [];
    setIsNextPageLoading(false);
    return response;
  };

  const loadNextPage = (...args) => {
    setIsNextPageLoading(true);
    setHasNextPage(items.length < 10000);
    setItems(findCity(...args));
  };

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: items,
    freesolo: true,
    getOptionLabel: option => option.name,
    getOptionSelected: option => option.name,
    onInputChange: (o,i) =>{
      setInputValue(i);
      loadNextPage();
    }
  });

  useEffect(() => {
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="infiniteLoader">
      <div> 
        <input placeholder="Search by city" className={classes.input} value={inputValue} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Wrapper
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          loadNextPage={loadNextPage}
          wrapperClassName={classes.listbox}
          getOptionProps={getOptionProps}
          groupedOptions={groupedOptions}
          listboxProps={getListboxProps()}
        />
      ) : null}
    </div>
  );
}

// TODO delete custom popper

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/CoursesSlice";
import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { makeStyles, styled } from "@material-ui/core/styles";
import "../assets/css/newfilters.css";

const autocompleteStyles = makeStyles((theme) => ({
  root: {
    "& .MuiChip-root": {
      backgroundColor: "#159858",
    },
    "& .MuiAutocomplete-tag": {
      color: "white",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "skyblue",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#159858",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#159858",
    },
    "& .MuiOutlinedInput-input": {
      color: "skyblue",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#159858",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#159858",
    },
    "& .MuiInputLabel-outlined": {
      color: "skyblue",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#159858",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#159858",
    },
  },
}));

const selectStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "skyblue",
    },
    "& .MuiInputLabel-root": {
      color: "skyblue",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "skyblue",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#159858",
    },
    "&:hover .MuiInputLabel-root": {
      color: "#159858",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#159858",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#159858",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#159858",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#159858",
    },
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function NewFilters() {
  const state = useSelector((state) => state.organisations);
  const languages = useSelector((state) => state.languages);
  const dispatch = useDispatch();
  const [sortParams, setsortParams] = useState({
    criteria: "relevance",
    sortby: "rating",
    certificate: false,
    langs: [],
    orgs: [],
  });

  const classes = selectStyles();
  const styleAutocomplete = autocompleteStyles();

  useEffect(() => {
    dispatch(getCourses(sortParams));
  }, [sortParams, dispatch]);

  return (
    <>
      {state && (
        <div className="filters">
          <div>
            <TextField
              className={classes.root}
              value={sortParams.criteria}
              onChange={(e) => {
                setsortParams((prev) => ({
                  ...prev,
                  criteria: e.target.value,
                }));
              }}
              label="Criteria"
              select
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="paid">Paid Course</MenuItem>
              <MenuItem value="free">Free Course</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              className={classes.root}
              value={sortParams.sortby}
              onChange={(e) => {
                setsortParams((prev) => ({ ...prev, sortby: e.target.value }));
              }}
              label="Sort-by"
              select
            >
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="high">High Price</MenuItem>
              <MenuItem value="low">Low Price</MenuItem>
            </TextField>
          </div>
          <div className="autoComplete">
            <Autocomplete
              classes={styleAutocomplete}
              multiple
              limitTags={2}
              id="languages-filter"
              onChange={(event, value) => {
                setsortParams((prev) => ({ ...prev, langs: value }));
              }}
              options={languages}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Languages"
                  placeholder="Languages"
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => {
                return <span {...props}>{option.nativeName}</span>;
              }}
              fullWidth
            />
          </div>
          <div className="autoComplete">
            <Autocomplete
              classes={styleAutocomplete}
              multiple
              limitTags={2}
              id="organisations"
              onChange={(event, value) => {
                setsortParams((prev) => ({ ...prev, orgs: value }));
              }}
              options={state}
              getOptionLabel={(option) => option.organisation}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Organisations"
                  placeholder="Organisations"
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => {
                return (
                  <div {...props}>
                    <img
                      style={{
                        height: "1cm",
                        width: "1cm",
                        marginRight: "0.5cm",
                      }}
                      src={process.env.REACT_APP_SERVER_URL + option.logoURL}
                      alt="course-logo"
                    />
                    {option.organisation}
                  </div>
                );
              }}
              fullWidth
            />
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Android12Switch
                  checked={sortParams.certificate}
                  onChange={(e) => {
                    setsortParams((prev) => ({
                      ...prev,
                      certificate: e.target.checked,
                    }));
                  }}
                />
              }
              label="Certificate Included"
            />
          </FormGroup>
        </div>
      )}
    </>
  );
}

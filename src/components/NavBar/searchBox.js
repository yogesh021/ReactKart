import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import FilterSelect from "./filterSelect";
import history from "../../history";
import ProductDataContext from "../../Contexts/productDataContext";

const styles = (theme) => ({
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
});

class SearchBox extends React.Component {
  static contextType = ProductDataContext;

  state = { query: "", modelOpen: false, category: "", subCategory: "" };

  handleCancel = () => {
    this.setState({ modelOpen: false });
  };

  handleSave = ({ category, subCategory }) => {
    this.setState({ modelOpen: false, category, subCategory });
  };

  handleClickOpen = () => this.setState({ modelOpen: true });

  returnSearchUrl = () => {
    const { query, category, subCategory } = this.state;
    let url = "/";
    if (query) url = url + `search/${query}`;
    if (category) url = url + "/" + category;
    if (subCategory) url = url + "/" + subCategory;
    return url;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{ cursor: "pointer" }} />
        </div>
        <InputBase
          placeholder="Search…"
          value={this.state.query}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={(e) => this.setState({ query: e.target.value })}
        />
        <Button
          variant=""
          style={{ color: "blue", backgroundColor: "white", fontWeight: "600" }}
          onClick={() => history.push(this.returnSearchUrl())}
        >
          Search
        </Button>
        <FilterSelect
          data={this.context}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          handleClickOpen={this.handleClickOpen}
          {...this.state}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBox);

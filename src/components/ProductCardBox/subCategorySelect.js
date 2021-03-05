import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SubCategorySelect extends React.Component {
  returnSubCategories = (data) => {
    const categoryArr = [];
    data.forEach((d) => {
      if (categoryArr.indexOf(d.product_sub_category) === -1)
        categoryArr.push(d.product_sub_category);
    });

    return categoryArr;
  };

  render() {
    const { classes } = this.props;
    const subCategories = this.returnSubCategories(this.props.data);
    return (
      <React.Fragment>
        <Select
          value={this.props.currentSubCategory}
          onChange={(e) => this.props.handleSubCategoryChange(e.target.value)}
          displayEmpty
          name="Sub Category"
          className={classes.selectEmpty}
        >
          {subCategories.map((category) => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SubCategorySelect);

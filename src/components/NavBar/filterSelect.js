import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  option: {
    cursor: "default",
    "&:hover": {
      backgroundColor: "#f6f6f6",
    },
  },
});

class FilterSelect extends React.Component {
  state = {
    category: "",
    subCategory: "",
  };

  handleCategoryChange = (value) => {
    this.setState({ category: value });
  };

  handleSubCategoryChange = (value) => {
    this.setState({ subCategory: value });
  };

  handleSave = () => {
    this.setState({ open: false });
  };

  returnCategories = (data) => {
    const arr = [];
    for (let key in data) arr.push(key);
    return arr;
  };

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
    const categories = this.returnCategories(this.props.data);
    const currentCategory = this.state.category;

    const subCategories = currentCategory
      ? this.returnSubCategories(this.props.data[this.state.category])
      : [];

    return (
      <div>
        <Button
          style={{ color: "white", marginLeft: "10px" }}
          onClick={this.props.handleClickOpen}
        >
          Filter <FilterListIcon />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.modelOpen}
        >
          <DialogTitle>Filter Search</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={(e) => this.handleCategoryChange(e.target.value)}
                  input={<Input id="category" />}
                >
                  <option className={classes.option} value="" />
                  {categories.map((item) => (
                    <option className={classes.option} key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sub-category">Sub-category</InputLabel>
                <Select
                  value={this.state.subCategory}
                  onChange={(e) => this.handleSubCategoryChange(e.target.value)}
                  input={<Input id="sub-category" />}
                >
                  <option className={classes.option} value="" />
                  {subCategories.map((item) => (
                    <option key={item} className={classes.option} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleCancel()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.props.handleSave(this.state)}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FilterSelect);

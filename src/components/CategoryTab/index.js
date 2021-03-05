import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

const productCategories = [
  "appliances",
  "electronics",
  "fashion",
  "grocery",
  "mobiles",
];

class CategoryTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Container>
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="on"
              style={{ height: "80px" }}
            >
              {productCategories.map((p) => (
                <Tab
                  style={{ height: "80px" }}
                  label={p}
                  key={p}
                  onClick={() => this.props.handleCategoryChange(p)}
                />
              ))}
            </Tabs>
          </Container>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(CategoryTab);

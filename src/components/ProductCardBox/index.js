import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ProductCard from "../ProductCard";

import ProductDataContext from "../../Contexts/productDataContext";
import SubCategorySelect from "./subCategorySelect";

import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 2,
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  link: {
    backgroundColor: "#1976d2",
    height: "20px",
    verticalAlign: "center",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    textTransform: "uppercase",
    fontWeight: "600",
    textDecoration: "none",
  },
});

class ProductCardBox extends React.Component {
  static contextType = ProductDataContext;

  constructor() {
    super();
    this.state = {
      currentCategoryData: [],
      currentSubCategory: "",
    };
  }

  componentDidMount() {
    const currentCategoryData = this.context[this.props.currentCategory];
    const currentSubCategory = currentCategoryData
      ? currentCategoryData[0]["product_sub_category"]
      : "";

    this.setState({ currentCategoryData, currentSubCategory });
  }

  componentDidUpdate(previousProps, previousState) {
    console.log(previousProps);
    if (previousProps !== this.props) {
      const currentCategoryData = this.context[this.props.currentCategory];
      const currentSubCategory = currentCategoryData
        ? currentCategoryData[0]["product_sub_category"]
        : "";

      this.setState({ currentCategoryData, currentSubCategory });
    }
  }

  handleSubCategoryChange = (value) => {
    this.setState({ currentSubCategory: value });
  };

  render() {
    const { currentSubCategory, currentCategoryData } = this.state;
    const currentCategory = this.props.currentCategory;
    const renderCards =
      currentCategoryData.length > 8
        ? currentCategoryData.slice(0, 8)
        : currentCategoryData;
    const { classes } = this.props;
    return (
      <Container style={{ padding: "20px" }}>
        <div className={classes.root} style={{ fontWeight: "600" }}>
          <div>
            Sub-category :
            <SubCategorySelect
              data={currentCategoryData}
              currentSubCategory={currentSubCategory}
              handleSubCategoryChange={this.handleSubCategoryChange}
            />
          </div>

          <Grid container spacing={24}>
            {currentCategoryData.map((d) => {
              return d.product_sub_category === currentSubCategory ? (
                <Grid
                  key={d.product_id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <ProductCard
                    cardStyle={classes.card}
                    productData={d}
                    key={d.product_id}
                  />
                </Grid>
              ) : null;
            })}
          </Grid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to={`/detail/${currentCategory}/${currentSubCategory}`}
              className={classes.link}
              style={{ textDecoration: "none" }}
            >
              See More
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(ProductCardBox);

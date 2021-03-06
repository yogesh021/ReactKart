import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import AddToCartButton from "../AddToCartButton";
import { Container } from "@material-ui/core";
import ProductDataContext from "../../Contexts/productDataContext";
import history from "../../history";

const styles = (theme) => ({
  card: {
    display: "flex",
    maxWidth: "600px",
    padding: "0 20px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    maxHeight: 100,
    objectFit: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class SearchResultList extends React.Component {
  static contextType = ProductDataContext;

  state = { screenWidth: 1024 };

  updateDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  returnSearchRegion = (category, subCategory) => {
    const data = [];
    for (let key in this.context) {
      data.push(...this.context[key]);
    }
    if (category && subCategory) {
      return data.filter(
        (d) =>
          d.product_category === category &&
          d.product_sub_category === subCategory
      );
    } else if (category && !subCategory) {
      return data.filter((d) => d.product_category === category);
    } else {
      return data;
    }
  };

  returnListItems = (category, subCategory, query) => {
    query = query.toLowerCase();
    console.log("query==", query);

    const searchRegion = this.returnSearchRegion(category, subCategory);
    return searchRegion.filter(
      (d) =>
        d.product_name.toLowerCase().indexOf(query) > -1 ||
        d.product_sub_category.toLowerCase().indexOf(query) > -1 ||
        d.product_category.toLowerCase().indexOf(query) > -1
    );
  };

  render() {
    const { classes, theme } = this.props;
    const { category, sub_category, query } = this.props.match.params;
    const listItems = this.returnListItems(category, sub_category, query);

    return listItems.length > 0 ? (
      <Container style={{ margin: "20px auto", maxWidth: "620px" }}>
        <h2>Search Result : </h2>
        {listItems.map((item) => (
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              component="img"
              image={item.product_image}
              title={item.product_name}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    history.push(
                      `/detail/${item.product_category}/${item.product_sub_category}/${item.product_id}`
                    )
                  }
                >
                  {item.product_name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: `${
                      this.state.screenWidth < 450 ? "column" : "row"
                    }`,
                    padding: "5px 10px",
                    marginTop: "10px",
                  }}
                >
                  <Chip
                    label={`Price | ${item.product_price}`}
                    size="small"
                    style={{
                      backgroundColor: "lightblue",
                      color: "blue",
                      marginRight: "5px",
                    }}
                  />
                  <Chip
                    label={`Rating | ${item.product_rating}`}
                    size="small"
                    style={{
                      backgroundColor: "#ffcc29",
                      color: "blue",
                      marginRight: "5px",
                      marginTop: `${this.state.screenWidth < 500 ? "10px" : 0}`,
                    }}
                  />
                </div>
                <div style={{ margin: "5px 5px 0 5px" }}>
                  <AddToCartButton
                    product_category={item.product_category}
                    product_id={item.product_id}
                    quantity={1}
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </Container>
    ) : (
      <h2
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No result found !
      </h2>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SearchResultList);

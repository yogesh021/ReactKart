import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AddToCartButton from "../AddToCartButton";
import "./descriptionPage.css";

import { Link } from "react-router-dom";
import history from "../../history";
import ProductDataContext from "../../Contexts/productDataContext";

const styles = {
  card: {
    maxWidth: 768,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "contain",
  },
  link: {
    backgroundColor: "#16c79a",
    height: "40px",
    verticalAlign: "center",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    textTransform: "uppercase",
    fontWeight: "600",
    textDecoration: "none",
  },
};

class DescriptionPage extends React.Component {
  static contextType = ProductDataContext;
  state = { productQuantity: 1, screenWidth: 1024 };

  updateDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  returnProduct = (category, id) => {
    const categoryData = this.context[category];
    const res = categoryData.filter((d) => d.product_id === id);
    return res[0];
  };

  setQuantity = (value) => {
    if (value < 1) this.setState({ productQuantity: 1 });
    else if (value > 10) this.setState({ productQuantity: 10 });
    else this.setState({ productQuantity: value });
  };
  render() {
    const { classes } = this.props;
    const { category, id } = this.props.match.params;
    const productDetail = this.returnProduct(category, id);
    return (
      <Container
        style={{ maxWidth: "100%", overflowX: "hidden", margin: "40px 0" }}
      >
        <Grid container>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Product image"
                  className={classes.media}
                  style={{ maxHeight: "300px" }}
                  image={productDetail.product_image}
                  title={productDetail.product_name}
                />
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontWeight: "900",
                    display: "flex",
                    maxWidth: "370px",
                  }}
                >
                  <span style={{ padding: "20px" }}>
                    {productDetail.product_name}
                  </span>
                </div>
                <div style={{ display: "flex", padding: "5px 20px" }}>
                  <Chip
                    label={`Price | ${productDetail.product_price}`}
                    style={{
                      backgroundColor: "lightblue",
                      color: "blue",
                      marginRight: "5px",
                    }}
                  />
                  <Chip
                    label={`Rating | ${productDetail.product_rating}`}
                    style={{
                      backgroundColor: "#ffcc29",
                      color: "blue",
                      marginRight: "5px",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "22px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Quantity :</span>
                  <TextField
                    style={{
                      width: "40px",
                      margin: "0 8px",
                    }}
                    type={"number"}
                    value={this.state.productQuantity}
                    onChange={(e) => this.setQuantity(e.target.value)}
                  />
                </div>
              </CardActions>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <AddToCartButton
                  product_category={category}
                  product_id={id}
                  quantity={this.state.productQuantity}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(DescriptionPage);

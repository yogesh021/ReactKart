import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton";
import history from "../../history";

const styles = {
  card: {
    maxWidth: 245,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "contain",
  },
  link: {
    backgroundColor: "#16c79a",
    height: "20px",
    verticalAlign: "center",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    textTransform: "uppercase",
    fontWeight: "600",
    textDecoration: "none",
  },
};

function ProductCard(props) {
  const { classes, cardStyle, productData } = props;
  const productCategory = productData.product_category;
  const productSubCategory = productData.product_sub_category;
  const productId = productData.product_id;

  const returnProductName = (name) => {
    const arr = name.split(" ");
    if (arr.length > 6) {
      return arr.slice(0, 6).join(" ");
    }
    return name;
  };

  return (
    <Card
      className={(classes.card, cardStyle)}
      style={{ marginBottom: "30px" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={`${productData.product_thumbnail}`}
          style={{ cursor: "default" }}
        />
        <CardContent>
          <h3
            onClick={() =>
              history.push(
                `/detail/${productCategory}/${productSubCategory}/${productId}`
              )
            }
            gutterBottom
            style={{ color: "black", fontWeight: "600" }}
          >
            {returnProductName(productData.product_name)}
          </h3>
          <div style={{ display: "flex" }}>
            <Chip
              size="small"
              label={`Rating | ${productData.total_rating}`}
              style={{
                backgroundColor: "#ffcc29",
                color: "blue",
                marginRight: "5px",
              }}
            />
            <Chip
              size="small"
              color="primary"
              label={`Price | ${productData.product_price}`}
            />
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={`/detail/${productCategory}/${productSubCategory}/${productId}`}
          className={classes.link}
          size="small"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          Detail <ArrowForwardOutlinedIcon />
        </Link>
        <AddToCartButton
          product_category={productCategory}
          product_id={productId}
          quantity={1}
        />
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ProductCard);

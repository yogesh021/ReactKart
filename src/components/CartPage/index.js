import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import AddToCartButton from "../AddToCartButton";
import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import TextField from "@material-ui/core/TextField";
import ProductDataContext from "../../Contexts/productDataContext";

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
    objectFit: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class CartPage extends React.Component {
  static contextType = ProductDataContext;

  state = { screenWidth: 1024, cartData: [] };

  updateDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  returnCartData = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    const allData = this.context;

    const res = [];
    for (let i = 0; i < data.length; i++) {
      const item = allData[data[i].product_category].find(
        (item) => item.product_id == data[i].product_id
      );
      if (item) {
        item.quantity = data[i].quantity;
        res.push(item);
      }
    }

    return res;
  };

  removeCartItem = (item) => {
    const newCart = this.state.cartData.filter((i) => {
      if (item.product_category !== i.product_category) return true;
      else if (
        item.product_category === i.product_category &&
        item.product_id !== i.product_id
      )
        return true;
      else return false;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    this.setState({ cartData: newCart });
  };

  returnTotalCost = () => {
    let price = 0;
    this.state.cartData.forEach(
      (item) => (price += item.quantity * item.product_price)
    );

    return price;
  };

  handleQuantityChange = (value, item) => {
    this.state.cartData.forEach((p, index) => {
      if (
        p.product_id === item.product_id &&
        p.product_category === item.product_category
      ) {
        const newCart = this.state.cartData;
        newCart[index].quantity = value;
        this.setState({ cartData: newCart });
      }
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const cartData = this.returnCartData();

    this.setState({ cartData });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { classes, theme } = this.props;
    const cartData = this.state.cartData;
    const total = this.returnTotalCost();
    //this.state.cartData.length >
    return this.state.cartData.length > 0 ? (
      <div style={{ display: "flex" }}>
        <Container
          style={{
            margin: "20px auto",
            maxWidth: "620px",
            maxHeight: "500px",
            overflowY: "scroll",
            flex: 1,
          }}
        >
          <h2>Your Cart : </h2>
          {this.state.cartData.map((item) => (
            <Card
              className={classes.card}
              key={item.product_category + item.product_id}
            >
              <CardMedia
                className={classes.cover}
                component="img"
                image={item.product_thumbnail}
                title={item.product_name}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
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
                        marginTop: `${
                          this.state.screenWidth < 500 ? "10px" : 0
                        }`,
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
                      value={item.quantity}
                      onChange={(e) => {
                        if (e.target.value > 0 && e.target.value < 11)
                          this.handleQuantityChange(e.target.value, item);
                        else if (e.target.value > 10) e.target.value = 10;
                        else e.target.value = 1;
                      }}
                    />
                  </div>
                  <div
                    style={{ margin: "15px 5px 0 5px" }}
                    onClick={() => {
                      this.removeCartItem(item);
                    }}
                  >
                    <Button size="small" color="secondary">
                      Remove from cart <RemoveCircleIcon />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <div
            style={{
              height: "35px",
              padding: "5px",
              backgroundColor: "blueviolet",
              color: "white",
              margin: "20px 0",
              borderRadius: "5px",
            }}
          >
            Total : Rs {total}
          </div>
          <Button
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              fontWeight: "600",
            }}
          >
            Checkout <PaymentIcon style={{ marginLeft: "5px" }} />
          </Button>
        </div>
      </div>
    ) : (
      <h2
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Your cart is empty!
      </h2>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CartPage);

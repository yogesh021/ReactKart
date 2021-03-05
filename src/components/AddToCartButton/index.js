import React from "react";
import Button from "@material-ui/core/Button";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Notification from "../Notification";

class AddToCartButton extends React.Component {
  state = { showNotification: false };

  handleClose = () => this.setState({ showNotification: false });

  storeData = (newData) => {
    const parsedData = JSON.parse(localStorage.getItem("cart"));
    const index = parsedData.findIndex(
      (item) =>
        item.product_category === newData.product_category &&
        item.product_id === newData.product_id
    );
    if (index > -1) parsedData[index].quantity++;
    else parsedData.push(newData);
    localStorage.setItem("cart", JSON.stringify(parsedData));
  };

  handleClick = (product_category, product_id, quantity) => {
    const newData = { product_category, product_id, quantity };
    let localStorageData = localStorage.getItem("cart");
    if (!localStorageData) localStorage.setItem("cart", "[]");

    this.storeData(newData);
    this.setState({ showNotification: true });
  };

  render() {
    const { product_category, product_id, quantity } = this.props;
    return (
      <React.Fragment>
        <Button
          size="small"
          color="primary"
          onClick={() =>
            this.handleClick(product_category, product_id, quantity)
          }
        >
          Add to cart <ShoppingCartOutlinedIcon />
        </Button>
        <Notification
          message="Item(s) added to your cart."
          showNotification={this.state.showNotification}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

export default AddToCartButton;

import React from "react";
import CategoryTab from "../CategoryTab";
import ProductCardBox from "../ProductCardBox";

class HomePage extends React.Component {
  state = { currentCategory: "appliances" };

  handleCategoryChange = (currentCategory) => {
    this.setState({ currentCategory });
  };

  render() {
    return (
      <React.Fragment>
        <CategoryTab handleCategoryChange={this.handleCategoryChange} />
        <ProductCardBox currentCategory={this.state.currentCategory} />
      </React.Fragment>
    );
  }
}

export default HomePage;

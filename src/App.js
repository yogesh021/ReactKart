import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import DescriptionPage from "./components/DescriptionPage";
import CartPage from "./components/CartPage";
import SearchResultList from "./components/SearchResultList";
import ErrorPage from "./components/ErrorPage";

import appliances from "./data/appliances.json";
import electronics from "./data/electronics.json";
import fashion from "./data/fashion.json";
import grocery from "./data/grocery.json";
import mobiles from "./data/mobiles.json";

import ProductDataContext from "./Contexts/productDataContext";
import history from "./history";
import SubCategoryDetailPage from "./components/SubCategoryDetailPage";

class App extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", "[]");
  }
  render() {
    const data = {
      appliances,
      electronics,
      fashion,
      grocery,
      mobiles,
    };
    return (
      <React.Fragment>
        <ProductDataContext.Provider value={data}>
          <NavBar />
        </ProductDataContext.Provider>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <ProductDataContext.Provider value={data}>
                  <HomePage {...props} />
                </ProductDataContext.Provider>
              )}
            />
            <Route
              path="/detail/:category/:sub_category"
              exact
              render={(props) => (
                <ProductDataContext.Provider value={data}>
                  <SubCategoryDetailPage {...props} />
                </ProductDataContext.Provider>
              )}
            />
            <Route
              path="/detail/:category/:sub_category/:id"
              exact
              render={(props) => (
                <ProductDataContext.Provider value={data}>
                  <DescriptionPage {...props} />
                </ProductDataContext.Provider>
              )}
            />
            <Route
              path="/cart"
              exact
              render={() => (
                <ProductDataContext.Provider value={data}>
                  <CartPage />
                </ProductDataContext.Provider>
              )}
            />
            <Route
              path="/search/:query/:category?/:sub_category?"
              exact
              render={(props) => (
                <ProductDataContext.Provider value={data}>
                  <SearchResultList {...props} />
                </ProductDataContext.Provider>
              )}
            />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

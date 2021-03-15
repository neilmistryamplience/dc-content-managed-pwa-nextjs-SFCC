import React from "react";
import {
  withStyles,
  WithStyles,
  Typography,
  Theme,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import GenericCMSComponent from "../components/GenericCMSComponent";
import ProductList from "../components/ProductList";
import SimpleImageBanner from "../components/SimpleImageBanner";
import CardList from "../components/CardList";
import Navigation from "../components/Navigation";

interface Props {
  component: any;
}

const TemplateChooser: React.SFC<Props> = (props) => {
  let { component } = props;
  if (component && component._meta) {
    let ComponentType = null;
    switch (component._meta.schema) {
      case "https://amplience.com/composablecommerce/sfcc-curated-products.json":
        ComponentType = ProductList;
        break;
      case "https://amplience.com/composablecommerce/simple-image-banner.json":
        ComponentType = SimpleImageBanner;
        break;
      case "https://amplience.com/composablecommerce/card-list.json":
        ComponentType = CardList;
        break;
      case "https://amplience.com/composablecommerce/navigation.json":
        ComponentType = Navigation;
        break;
      default:
        ComponentType = GenericCMSComponent;
    }

    return <ComponentType {...component} />;
  }
  return null;
};

export default TemplateChooser;

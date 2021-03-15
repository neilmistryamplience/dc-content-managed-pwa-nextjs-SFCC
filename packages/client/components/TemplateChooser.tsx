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
import Card from "../components/Card";
import Page from "../components/Page";
import Navigation from "../components/Navigation";
import AdvancedBanner from "../components/AdvancedBanner";

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
    case "https://amplience.com/composablecommerce/advanced-banner.json":
            ComponentType = AdvancedBanner;
            break;
      case "https://amplience.com/composablecommerce/card-list.json":
        ComponentType = CardList;
        break;
    case "https://amplience.com/composablecommerce/card.json":
        ComponentType = Card;
        break;
      case "https://amplience.com/composablecommerce/navigation.json":
        ComponentType = Navigation;
        break;
      case "https://amplience.com/composablecommerce/page.json":
        ComponentType = Page;
        break;
      default:
        ComponentType = GenericCMSComponent;
    }

    return <ComponentType {...component} />;
  }
  return null;
};

export default TemplateChooser;

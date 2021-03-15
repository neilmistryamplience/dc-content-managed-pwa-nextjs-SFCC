import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import PromoBanner from "../components/PromoBanner";
import UserActions from "../components/UserActions";
import Navigation from "../components/Navigation";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import TemplateChooser from "../components/TemplateChooser";
import Sidebar from "../components/Sidebar";
import { fetchContent } from "../utils/fetchContent";
import {
  fetchProductById,
  fetchProductsByIds,
  fetchProductsBySearch,
} from "../utils/fetchSFCCProducts";

interface Props {
  navigation: {
    navigation: {
      links: {
        type: string;
        data: {
          label: string;
          link: string;
        };
      }[];
    };
  };
  slot: {
    content: any[];
  };
  products: any[];
  productslist: any[];
  productSearch: any[];
}

const Index: NextPage<Props> = (props: Props) => {
  let { navigation, slot, products, productslist, productSearch } = props;

  //console.log("Products! - ", products);

  //console.log("Products List! - ", productslist)

  console.log("Products Search! - ", productSearch);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /** Data fixes if not loaded **/
  let defaultNavContent = navigation?.navigation?.links || [
    {
      type: "root-menu",
      data: {
        label:
          'Error: No Navigation Slot with content for delivery key "slots/navigation"',
        link: "/",
      },
    },
  ];
  const navigationLinks = defaultNavContent;

  let defaultSlotContent = {
    content: [
      {
        description:
          'No Page Slot with content for delivery key "slots/homepage-hero"',
        component: "EditorialBlock",
        title: "Error loading content",
      },
    ],
  };
  if (slot && slot.content) {
    defaultSlotContent = slot;
  }
  const slotContent = defaultSlotContent;

  return (
    <>
      <Head>
        <title>ANYA FINN</title>
      </Head>

      <div>
        <PromoBanner>ORDER BEFORE 1PM FOR NEXT DAY DELIVERY</PromoBanner>

        <Header
          actions={<UserActions />}
          search={<SearchBox />}
          navigation={<Navigation menu={navigationLinks}></Navigation>}
          onToggleSidebar={handleToggleSidebar}
        ></Header>

        {slotContent.content.map((component: any) => {
          return <TemplateChooser {...component} />;
        })}

        <Footer />
      </div>

      <Sidebar
        menu={navigationLinks}
        open={sidebarOpen}
        onToggleOpen={handleToggleSidebar}
      />
    </>
  );
};

Index.getInitialProps = async (context) => {
  const navigation = fetchContent("slots/navigation", context);
  const slot = fetchContent("slots/homepage-hero", context);

  const products = fetchProductById("25519044M", context);
  const prods: Array<any> = [
    "25519044M",
    "25564754M",
    "25518447M",
    "25591072M",
  ];
  const productslist = fetchProductsByIds(prods, context);

  const productSearch = fetchProductsBySearch(
    "scarf",
    12,
    "womens-accessories",
    "most-popular",
    context
  );

  return {
    navigation: await navigation,
    slot: await slot,
    products: await products,
    productslist: await productslist,
    productSearch: await productSearch,
  };
};

export default Index;

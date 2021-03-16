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
import SlotChooser from "../components/SlotChooser";
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
      menu: {
        type: string;
        data: {
          label: string;
          link: string;
        };
      }[];
    };
  };
  slothero: {
    _meta:any;
    content: any[];
  };
  slotbody: {
    _meta:any;
    content: any[];
  };
  slotproducts: {
    _meta:any;
    content: any[];
  };
  /*products: any[];
  productslist: any[];
  productSearch: any[];*/
}

const Index: NextPage<Props> = (props: Props) => {
  let { navigation, slothero, slotbody, slotproducts/*, products, productslist, productSearch*/ } = props;

  //console.log("Navigation! - ", navigation);
  //console.log("Products List! - ", productslist)
  //console.log("Products Search! - ", productSearch);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /** Data fixes if not loaded **/
  let defaultNavContent = navigation?.navigation?.menu || [
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
  if (slothero && slothero.content) {
    defaultSlotContent = slothero;
  }
  const slotContent:any = defaultSlotContent;

  //console.log("What is the Slot", slotContent)

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

        <SlotChooser {...slotContent} />
        <SlotChooser {...slotbody} />
        <SlotChooser {...slotproducts} />  

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

/*
 - hero: home/main/hero-localised
 - body: home/main/body-localised
 - products: home/main/products-localised
 - Navigation: dior/web/menu
*/
Index.getInitialProps = async (context) => {
  const navigation = fetchContent("main/navigation", context);
  const slothero = fetchContent("home/main/hero-localised", context);
  const slotbody = fetchContent("home/main/body-localised", context);
  const slotproducts = fetchContent("home/main/products-localised", context);

  /*const products = fetchProductById("25519044M", context);
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
  );*/

  return {
    navigation: await navigation,
    slothero: await slothero,
    slotbody: await slotbody,
    slotproducts: await slotproducts,
    /*products: await products,
    productslist: await productslist,
    productSearch: await productSearch,*/
  };
};

export default Index;

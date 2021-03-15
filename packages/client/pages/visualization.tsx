import React from 'react';
import { NextPage } from 'next';

import EditorialBlock from '../components/EditorialBlock';
import HeroBannerBlock from '../components/HeroBannerBlock';
import GalleryBlock from '../components/GalleryBlock';
import ProductList from '../components/ProductList';
import SimpleImageBanner from '../components/SimpleImageBanner';
import CardList from '../components/CardList';
import Navigation from '../components/Navigation';
import { fetchContentById } from '../utils/fetchContent';
import GenericCMSComponent from '../components/GenericCMSComponent';

interface Props {
    component: any
}

const Visualization: NextPage<Props> = (props: Props) => {
    let {
        component
    } = props;

    let ComponentType = null;

    console.log("SCHEMA: = ", component._meta.schema)
    switch (component._meta.schema) {
        case 'https://amplience.com/composablecommerce/sfcc-curated-products.json':
            ComponentType = ProductList;
            break;
        case 'https://amplience.com/composablecommerce/simple-image-banner.json':
            ComponentType = SimpleImageBanner;
            break;
        case 'https://amplience.com/composablecommerce/card-list.json':
            ComponentType = CardList;
            break;
        default:
            console.log("I'm in here!!!????")
            ComponentType = GenericCMSComponent
    }


    return (
        <ComponentType {...component} />
    );

    return null;
}

Visualization.getInitialProps = async (context) => {
    const content = fetchContentById(
        context.query.id as string, 
        context
    );

    return {
        component: await content
    };
};

export default Visualization;
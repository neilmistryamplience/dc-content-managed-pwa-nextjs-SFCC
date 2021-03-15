import React from 'react';
import { NextPage } from 'next';
import { fetchContentById } from '../utils/fetchContent';
import TemplateChooser from '../components/TemplateChooser';

interface Props {
    component: any
}

const Visualization: NextPage<Props> = (props: Props) => {
    return (
        <TemplateChooser {...props}/>
    );
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
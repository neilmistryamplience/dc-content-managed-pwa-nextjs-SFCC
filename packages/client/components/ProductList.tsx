
import React, { useState, useEffect } from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Section, { SectionVariant } from './Section';
import CallToAction from './CallToAction';
import { fetchProductsByIds } from '../utils/fetchSFCCProducts';

const styles = (theme: Theme) => ({
    root: {
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row' as 'row',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'space-between'
    },
    listItem: {
        width: '30%',

        [theme.breakpoints.down('md')]: {
            width: '45%'
        },

        [theme.breakpoints.down('sm')]: {
            width: '95%'
        }
    },
    listItemImage: {
        width: '100%',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.025)'
        }
    },
    listItemText: {
        marginTop: '15px'
    }
});

export type ProductItem = {
    image: string;
    title: string;
    callToAction: string;
    callToActionHref: string;
};

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    productList?: any[];
}

const ProductList: React.SFC<Props> = (props) => {
    const {
        classes,
        productList = [],
        ...other
    } = props;

    const [results, setResults] = useState([] as any);

    

    const fetchResults = () => {
        const products = fetchProductsByIds(productList)
            .then( result => {
                console.log("RESULT", result);
                setResults( result);
               }, function(error) {
                setResults([]);
               });
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <Section title="" variant={SectionVariant.CONTAINED} {...other}>
            <ul className={classes.list}>
                {
                    results.map((item: any, index: number) => {
                        return <li className={classes.listItem}>
                            <img className={classes.listItemImage} src={item.image_groups[0].images[0].link} />
                            <Typography variant="h5">
                                    {item.name}
                                </Typography>
                                    <Typography variant="body2">
                                        {item.short_description}
                                    </Typography>
                                    
                                            <Typography variant="h6">
                                                £{item.price}
                                            </Typography>
                                    
                                
                                <CallToAction href={item.master.link}>
                                    SHOP NOW
                                </CallToAction>
                        </li>
                    })
                }
            </ul>
        </Section>
    );
};

export default withStyles(styles)(ProductList);

import React, { useState, useEffect } from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Section, { SectionVariant } from './Section';
import CallToAction from './CallToAction';
import TemplateChooser from './TemplateChooser';

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
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '95%'
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
    header?:string
    cards?: any[];
}

const CardList: React.SFC<Props> = (props) => {
    const {
        classes,
        header,
        cards = [],
        ...other
    } = props;

    

    return (
        <Section title={header} variant={SectionVariant.CONTAINED} {...other}>
            <ul className={classes.list}>
                {

                    cards.map((card: any, index: number) => {
                        const ammended = {component: {...card}}
                        return <li className={classes.listItem}>
                            <TemplateChooser {...ammended} />
                            </li>
                    })
                }
            </ul>
        </Section>
    );
};

export default withStyles(styles)(CardList);
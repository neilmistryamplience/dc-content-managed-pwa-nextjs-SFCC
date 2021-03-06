import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const styles = (theme: Theme) => ({
    root: {
        padding: '0px 45px',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        borderTop: `1px solid ${theme.palette.grey[400]}`
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        display: 'inline-block',
        padding: '10px 15px',
        cursor: 'pointer',
        borderBottom: `3px solid ${theme.palette.background.default}`,
        transition: 'all 0.3s',
        '& a':{
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
        '&:hover': {
            borderBottom: `3px solid ${theme.palette.primary.light}`,
        }
    },
    activeListItem: {
        borderBottom: `3px solid ${theme.palette.primary.light}`
    }
});

export type NavigationLink = {
    type: string;
    data:{
        label:string;
        link?:string;
    };
};

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    menu:NavigationLink[];
}

const Navigation: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        menu,
        ...other
    } = props;

    const router = useRouter();

    return (
        <nav className={clsx(classes.root, className)} {...other}>
            <ul className={classes.list}>
                {
                    menu.map(link => {
                        if(!link.data.link) link.data.link = "#";
                        return <li className={clsx(classes.listItem, {
                            [classes.activeListItem]: router?.asPath === link.data.link
                        })}>
                            <Link href='/' as={link.data.link}>
                                <a>
                                    {link.data.label}
                                </a>
                            </Link>
                        </li>;
                    })
                }
            </ul>
        </nav>
    );
};

export default withStyles(styles)(Navigation);
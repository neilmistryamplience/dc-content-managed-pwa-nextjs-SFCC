import React from 'react';
import { withStyles, WithStyles, Typography, Theme, Button } from '@material-ui/core';
import clsx from 'clsx';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { getImageURL, ImageScaleMode } from '../utils/getImageURL';

const styles = (theme: Theme) => ({
    root: {
    },
    image: {
        width: '100%'
    },
    overlay: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayPanel: {
        background: fade(theme.palette.background.default, 0.9),
        padding: '20px 30px',
        textAlign: 'center' as 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    bannerImage: any;
    positionalLink?:any;
}

const SimpleImageBanner: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        bannerImage,
        positionalLink,
        ...other
    } = props;

    const imageUrl = getImageURL(bannerImage.image.image, {
        width: 3000,
        upscale: false
    });

    const buttonDStyle = {
        left: '36%',
        top: '90%',
        position: 'absolute'
      } as React.CSSProperties;

    return (
        <div className={clsx(classes.root, className)} {...other} style={{position:'relative'}}>
                <img className={classes.image} src={imageUrl} style={{position:'relative'}}/>
                {
                            positionalLink ? (
                                <a href={positionalLink.button.buttonLink} style={buttonDStyle}>
                                    <Button variant='contained' color='primary'>{positionalLink.button.buttonLabel}</Button>
                                </a>
                            ) : null
                        }
        </div>
    );
};

export default withStyles(styles)(SimpleImageBanner);
import React from "react";
import {
  withStyles,
  WithStyles,
  Typography,
  Theme,
  Button,
} from "@material-ui/core";
import clsx from "clsx";

import { fade } from "@material-ui/core/styles/colorManipulator";
import { getImageURL, ImageScaleMode } from "../utils/getImageURL";

const styles = (theme: Theme) => ({
  root: {},
  image: {
    width: "100%",
  },
  overlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayPanel: {
    background: fade(theme.palette.background.default, 0.9),
    padding: "20px 30px",
    textAlign: "center" as "center",
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  cardImage: any;
  cardName?: any;
  description?: any;
  button?: any;
}

const Card: React.SFC<Props> = (props) => {
  const {
    classes,
    className,
    cardImage,
    cardName,
    description,
    button,
    ...other
  } = props;

  const imageUrl = getImageURL(cardImage.imageholder.image.image, {
    width: 3000,
    upscale: false,
  });
  /*const imageUrl = getImageURL(bannerImage.image.image, {
        width: 3000,
        upscale: false
    });*/

  return (
    <div
      className={clsx(classes.root, className)}
      {...other}
      style={{ position: "relative" }}
    >
      <img
        className={classes.image}
        src={imageUrl}
        style={{ position: "relative" }}
      />
      
      {cardName && cardName?.text ? (
        <Typography variant="h6" align='center' >
          {cardName.text}
        </Typography>
      ) : null}
      {description && description?.text ? (
        <Typography variant="body2" align='center'>
          {description.text}
        </Typography>
      ) : null}

      {button && button?.buttonLabel ? (
        <a href={button.buttonLink}>
          <Button variant="contained" color="primary"  style={{ margin: "auto", display: "block" }}>
            {button.buttonLabel}
          </Button>
        </a>
      ) : null}
    </div>
  );
};

export default withStyles(styles)(Card);

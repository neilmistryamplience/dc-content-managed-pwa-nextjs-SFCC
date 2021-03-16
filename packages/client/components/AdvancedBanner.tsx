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
  bannerImage?: any;
  video?: any;
  hasVideo: boolean;
  header?: any;
  subheader?: any;
  description?: any;
  button?: any;
}

const AdvancedBanner: React.SFC<Props> = (props) => {
  const {
    classes,
    className,
    bannerImage,
    video,
    hasVideo,
    header,
    subheader,
    description,
    button,
    ...other
  } = props;

  var imageUrl = null;
  if (bannerImage?.image?.image) {
    imageUrl = getImageURL(bannerImage?.image?.image, {
      width: 3000,
      upscale: false,
    });
  }

  const buttonDStyle = {
    left: "36%",
    top: "90%",
    position: "absolute",
  } as React.CSSProperties;

  return (
    <div
      className={clsx(classes.root, className)}
      {...other}
      style={{ position: "relative" }}
    >
      {imageUrl ? (
        <img
          className={classes.image}
          src={imageUrl}
          style={{ position: "relative" }}
        />
      ) : null}
      {hasVideo && video ? (
        <div className="video">
          <video
            className="video"
            poster={`//${video.amplienceVideo.defaultHost}/v/${video.amplienceVideo.endpoint}/${video.amplienceVideo.name}?protocol=https`}
            playsInline
            autoPlay
            muted
            loop
            style={{ width: "100%", position:'relative' }}
            src={`//${video.amplienceVideo.defaultHost}/v/${video.amplienceVideo.endpoint}/${video.amplienceVideo.name}/mp4_720p?protocol=https`}
          >
            <source
              src={`//${video.amplienceVideo.defaultHost}/v/${video.amplienceVideo.endpoint}/${video.amplienceVideo.name}/mp4_720p?protocol=https`}
              data-res="High"
              data-bitrate="2119"
              data-label="High"
              type="video/mpeg4"
            />

            <source
              src={`//${video.amplienceVideo.defaultHost}/v/${video.amplienceVideo.endpoint}/${video.amplienceVideo.name}/mp4_480p?protocol=https`}
              data-res="Medium"
              data-bitrate="689"
              data-label="Medium"
              type="video/mpeg4"
            />

            <source
              src={`//${video.amplienceVideo.defaultHost}/v/${video.amplienceVideo.endpoint}/${video.amplienceVideo.name}/webm_480p?protocol=https`}
              data-res="Medium"
              data-bitrate="624"
              data-label="Medium"
              type="video/webm"
            />
          </video>
          <div className="pause-button inactive"></div>
        </div>
      ) : null}
    <div style={{position:'absolute', width: '100%', height:'100%', top:0, left:0, display:'block', textAlign:'center'}}>
        <div style={{width:'80%', bottom:'3.75rem', left:'50%', transform:'translateX(-50%)', position:'absolute'}}>
      {header && header?.text ? (
        <Typography variant="h4" style={{color:'white'}}>{header.text}</Typography>
      ) : null}
      {subheader && subheader?.text ? (
        <Typography variant="h5" style={{color:'white'}}>{subheader.text}</Typography>
      ) : null}
      {description && description?.text ? (
        <Typography variant="body2" style={{color:'white'}}>{description.text}</Typography>
      ) : null}

      {button && button?.buttonLabel ? (
        <a href={button.buttonLink}>
          <Button variant="contained" color="primary">
            {button.buttonLabel}
          </Button>
        </a>
      ) : null}
      </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(AdvancedBanner);

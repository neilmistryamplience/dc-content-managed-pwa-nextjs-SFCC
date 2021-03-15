
import React, { useState, useEffect } from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import TemplateChooser from './TemplateChooser';

const styles = (theme: Theme) => ({
    root: {
    }
});

interface Props extends WithStyles<typeof styles> {
        _meta:any;
        contentTypes?: any[];
}

const Page: React.SFC<Props> = (props) => {
    const {
        _meta,
        contentTypes
    } = props;

    

    return <div>
        {
            contentTypes.map((content: any, index: number) => {
                const ammended = {component: {...content}}
                return <TemplateChooser {...ammended} />
            })
        }
    </div>
};

export default withStyles(styles)(Page);
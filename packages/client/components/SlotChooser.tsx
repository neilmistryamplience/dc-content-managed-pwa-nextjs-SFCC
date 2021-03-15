import React from "react";

import TemplateChooser from "./TemplateChooser";

interface Props {
  _meta:{
    name:string;
    schema:string;
    deliveryId:string;
  },
  content:any;
}

const SlotChooser: React.SFC<Props> = (props) => {
  //let { content } = props;
  const { _meta, content } = props;
  

  var jsontosend = null;

  if (_meta) {
    switch (_meta.schema) {
      case "https://www.amplience.com/examples/sfcc-slot-flexible-localised.json":
      case "https://www.amplience.com/examples/sfcc-slot-flexible.json":
        jsontosend = {component: {...content}}
        break;
    }
    //console.log("Slot Chooser", jsontosend);
    return <TemplateChooser {...jsontosend} />;
  }
  return null;
};

export default SlotChooser;

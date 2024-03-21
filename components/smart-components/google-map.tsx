import { forwardRef } from "react";

interface Props {
  location: string;
}

const googleMap = function ({ location }: Props) {
  const mapUri =
    "https://www.google.com/maps/embed/v1/place?key=" + process.env.GOOGLE_API_KEY + "&q=" +
    encodeURI(location);
  const iframeStyle = {
    width: 450,
    height: 250,
    frameBorder: 0,
    style: "border:0",
    referrerPolicy: "no-referrer-when-downgrade",
  };
  return <iframe style={iframeStyle} src={mapUri}></iframe>;
};

googleMap.displayName = "GoogleMap";
export default googleMap;

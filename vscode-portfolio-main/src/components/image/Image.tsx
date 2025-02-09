import { IKImage } from "imagekitio-react";

type ImageType = {
  loading: "lazy";
  width?: number;
  height?: number;
  alt: string;
  path: string;
  lqip: object;

  className?: string;
};
const Image = (props: ImageType) => {
  const urlEndpoint = "https://ik.imagekit.io/2u0caxvlz";
  return <IKImage urlEndpoint={urlEndpoint} {...props} />;
};

export default Image;

export const makeImagePath = (id: string, format?: string) => {
  return `${process.env.REACT_APP_IMAGE_BASE_PATH}/${
    format ? format : "original"
  }/${id}`;
};

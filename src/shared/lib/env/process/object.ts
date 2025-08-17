const transform = (v: string) => {
  try {
    return JSON.parse(v) as string;
  } catch (error) {
    console.error(error);
    return v;
  }
};

export const object = {
  transform
};

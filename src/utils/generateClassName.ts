type ClassObject<T extends string> = { [x in T]: boolean | undefined | string };

const generateClassName = <T extends string>(params: ClassObject<T>): string => {
  const classes = Object.keys(params) as T[];
  const validClasses = classes.filter((itemClass) => Boolean(params[itemClass]));
  return validClasses.join(' ');
};

export default generateClassName;

import labels from './labels.json';

export const getTranslatedLabel = (key) => {
  let variable = labels;
  key?.split('.')?.map((element) => {
    if (variable[element]) {
      variable = variable[element];
    }
    return element;
  });
  let label = key?.split('.').length > 1 ? variable : null;
  Object.keys(labels).map((k) => {
    if (!label) {
      label = labels[k][key];
    }
    return k;
  });
  return label ? label : key;
};

export const EMPTY_VALUE = '-';

export const getResponse = (res, key) => {
  if (key && res) {
    let variable = res;
    // eslint-disable-next-line array-callback-return
    key?.split('.').map((element) => {
      if (variable !== null) {
        if (variable === undefined || variable[element] === undefined) {
          variable = null;
        } else {
          variable = variable[element];
        }
      }
    });
    return variable || EMPTY_VALUE;
  }
  return EMPTY_VALUE;
};

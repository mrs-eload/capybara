export const removeEmptyKeys = (obj) => {
  if (!obj) throw new Error('empty object provided'); // fixme - handle better?
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object')
      return removeEmptyKeys(obj[key]);
    if (obj[key] === null) delete obj[key];
  });
  return obj;
};
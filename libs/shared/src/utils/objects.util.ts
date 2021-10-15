export const deleteObjectField = <T = Record<string, any>>(
  value: T | T[],
  field: keyof T,
) => {
  if (Array.isArray(value)) {
    return value.map((obj) => {
      delete obj[field];
      return obj;
    });
  }

  delete value[field];
  return value;
};

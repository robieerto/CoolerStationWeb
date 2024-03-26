const toDate = (value) => {
  if (!value) return '';
  const date = new Date(value).toLocaleString('sk-SK').replaceAll('. ', '.');
  if (date != 'Invalid Date') return date;
  else return '';
};

export { toDate };

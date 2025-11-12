// Lightweight date helpers (no moment dependency)
export const toISODate = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString().split('T')[0];
};

export const daysBetween = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

export const formatDate = (d) => toISODate(d);

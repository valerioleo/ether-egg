export const isNumber = value => !isNaN(Number(value));

export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

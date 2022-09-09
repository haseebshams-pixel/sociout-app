export const getCloser = (value: any, checkOne: any, checkTwo: any) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

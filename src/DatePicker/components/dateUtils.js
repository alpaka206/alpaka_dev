// dateUtils.js
export const getYears = () => {
  let currentYear = new Date().getFullYear();
  let years = [];
  for (let i = currentYear - 20; i < currentYear + 20; i++) {
    years.push({ value: i, text: i });
  }
  return years;
};

export const getMonths = () => {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, text: i });
  }
  return months;
};

export const getDays = (year, month) => {
  let dayCount = new Date(year, month, 0).getDate();
  let days = [];
  for (let i = 1; i <= dayCount; i++) {
    days.push({ value: i, text: i });
  }
  return days;
};

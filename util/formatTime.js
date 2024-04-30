const dayjs = require("dayjs");

// Function untuk mengatur lama atau jarak hari, bulan, tahun sesuai yg diinputkan
exports.getDisDate = function (startDate, endDate) {
  const days = dayjs(endDate).diff(startDate, "day");
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days === 1) {
    return "1 day";
  }

  if (days < 30) {
    return days + " days";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return months + " months";
  }

  if (years === 1) {
    return "1 year";
  }

  return years + " years";
};

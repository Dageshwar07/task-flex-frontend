// Validate email using a simple regex pattern
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Add thousands separator to a number
export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) {
    return "0";
  }

  const [integralPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integralPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

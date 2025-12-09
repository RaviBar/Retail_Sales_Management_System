export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return dateString;
  }
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return 'N/A';
  return `${parseFloat(value).toFixed(2)}%`;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  return phone;
};




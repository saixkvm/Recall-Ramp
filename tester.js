const date = new Date();
console.log(date);
const formattedDate = date.toISOString().split('T')[0];
console.log(formattedDate);
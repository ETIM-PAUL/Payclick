export function currentDate() {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = dateFormatter.format(currentDate);
  return formattedDate;
}
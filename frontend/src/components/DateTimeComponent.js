export default function DateTimeComponent({dateTime}) {
  let dateTimeObj = undefined;
  if (dateTime instanceof Date) {
    dateTimeObj = dateTime;
  } else if (dateTime instanceof String) {
    dateTimeObj = new Date(dateTime);
  }

  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const formattedDateTime = formatter.format(dateTimeObj);
  return (<span>{formattedDateTime}</span>);
}
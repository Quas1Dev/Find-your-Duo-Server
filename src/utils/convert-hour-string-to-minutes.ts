export function convertHourStringToMinutes(hourString: string): number {
  // Retrieve hour and minutes from the hourString *1
  const [hour, minutes] = hourString.split(':').map(Number);

  const minutesAmount = hour * 60 + minutes;

  return minutesAmount;
}

/*
Dev's comments

*1 - hourString contains minutes representing 
*/
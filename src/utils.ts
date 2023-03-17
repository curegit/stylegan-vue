const nameof = <T>(name: Extract<keyof T, string>): string => name;

export { nameof };

function now(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");
  const hour = `${now.getHours()}`.padStart(2, "0");
  const minute = `${now.getMinutes()}`.padStart(2, "0");

  return `${year}${month}${date}-${hour}${minute}`;
}

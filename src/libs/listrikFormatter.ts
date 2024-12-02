export default function listrikFormatter(value: number): string {
  if (value == 1) {
    return "> 2200 VA";
  } else if (value == 2) {
    return "2200 VA";
  } else if (value == 3) {
    return "1300 VA";
  } else if (value == 4) {
    return "900 VA";
  } else if (value == 5) {
    return "450 VA";
  } else {
    return "input tidak valid";
  }
}

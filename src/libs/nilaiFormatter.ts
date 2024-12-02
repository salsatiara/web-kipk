export default function nilaiFormatter(value: number): string {
  if (value == 1) {
    return "< 75";
  } else if (value == 2) {
    return "75 - 79,99";
  } else if (value == 3) {
    return "80 - 84,99";
  } else if (value == 4) {
    return "85 - 89,99";
  } else if (value == 5) {
    return "≥ 90";
  } else {
    return "input tidak valid";
  }
}

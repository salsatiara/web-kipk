export default function tanggunganFormatter(value: number): string {
  if (value == 1) {
    return "1 orang";
  } else if (value == 2) {
    return "2 orang";
  } else if (value == 3) {
    return "3 orang";
  } else if (value == 4) {
    return "4 orang";
  } else if (value == 5) {
    return "> 4 orang";
  } else {
    return "input tidak valid";
  }
}

export default function penghasilanFormatter(value: number): string {
  if (value == 1) {
    return "≥  Rp 5.000.001";
  } else if (value == 2) {
    return "Rp 3.500.001 - Rp 5.000.000";
  } else if (value == 3) {
    return "Rp 2.500.001 - Rp 3.500.000";
  } else if (value == 4) {
    return "Rp 1.500.001 - Rp 2.500.000";
  } else if (value == 5) {
    return "≤ Rp 1.500.000";
  } else {
    return "input tidak valid";
  }
}

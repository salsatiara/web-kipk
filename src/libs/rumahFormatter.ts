export default function rumahFormatter(value: number): string {
  if (value == 1) {
    return "Rumah milik sendiri, punya mobil dan motor";
  } else if (value == 2) {
    return "Rumah milik sendiri, punya motor";
  } else if (value == 3) {
    return "Rumah warisan, tidak punya kendaraan";
  } else if (value == 4) {
    return "Mengontrak/Kos, tidak punya kendaraan";
  } else if (value == 5) {
    return "Menumpang (ikut saudara/kerabat), tidak punya kendaraan";
  } else {
    return "input tidak valid";
  }
}

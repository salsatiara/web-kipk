export default function kalkulasiWaktu(time: string): string {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years + " tahun";
  } else if (months > 0) {
    return months + " bulan";
  } else if (weeks > 0) {
    return weeks + " minggu";
  } else if (days > 0) {
    return days + "h";
  } else if (hours > 0) {
    return hours + "j";
  } else if (minutes > 0) {
    return minutes + "m";
  } else {
    return seconds + "d";
  }
}

type Data = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
};

export default function kalkulasiPembagi(data: Data[], kriteria: string) {
  let temp = 0;
  data.map((item) => {
    temp += (item[kriteria as keyof Data] as number) ** 2;
  });
  const result = Math.sqrt(temp);
  return result;
}

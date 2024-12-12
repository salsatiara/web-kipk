import kalkulasiPembagi from "@/libs/kalkulasiPembagi";

type Alternatif = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
}[];

type Kriteria = {
  id: number;
  kode: string;
  kriteria: string;
  tipe: string;
  bobot: number;
  rentang1: string;
  bobot1: number;
  rentang2: string;
  bobot2: number;
  rentang3: string;
  bobot3: number;
  rentang4: string;
  bobot4: number;
  rentang5: string;
  bobot5: number;
}[];

export default function kalkulasiBobotTernormalisasi(
  alternatif: Alternatif,
  kriteria: Kriteria
): Alternatif {
  const pembagi = {
    penghasilan: kalkulasiPembagi(alternatif, "penghasilan"),
    jmlTanggungan: kalkulasiPembagi(alternatif, "jmlTanggungan"),
    nilai: kalkulasiPembagi(alternatif, "nilai"),
    rumah: kalkulasiPembagi(alternatif, "rumah"),
    listrik: kalkulasiPembagi(alternatif, "listrik"),
  };

  const ternormalisasi = alternatif.map((item) => {
    return {
      id: item.id,
      nisn: item.nisn,
      nama: item.nama,
      penghasilan: item.penghasilan / pembagi.penghasilan,
      jmlTanggungan: item.jmlTanggungan / pembagi.jmlTanggungan,
      nilai: item.nilai / pembagi.nilai,
      rumah: item.rumah / pembagi.rumah,
      listrik: item.listrik / pembagi.listrik,
    };
  });

  const bobotTernormalisasi = ternormalisasi.map((item) => {
    return {
      id: item.id,
      nisn: item.nisn,
      nama: item.nama,
      penghasilan:
        item.penghasilan * (kriteria.find((k) => k.kode === "C1")?.bobot || 0),
      jmlTanggungan:
        item.jmlTanggungan *
        (kriteria.find((k) => k.kode === "C2")?.bobot || 1),
      nilai: item.nilai * (kriteria.find((k) => k.kode === "C3")?.bobot || 2),
      rumah: item.rumah * (kriteria.find((k) => k.kode === "C4")?.bobot || 3),
      listrik:
        item.listrik * (kriteria.find((k) => k.kode === "C5")?.bobot || 4),
    };
  });

  return bobotTernormalisasi;
}

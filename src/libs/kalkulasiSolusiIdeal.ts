type SolusiIdeal = {
  positif: {
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
  };
  negatif: {
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
  };
};

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

type Matriks = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
}[];

export default function kalkulasiSolusiIdeal(
  kriteria: Kriteria,
  matriks: Matriks
): SolusiIdeal {
  const positif: SolusiIdeal["positif"] = {
    penghasilan:
      kriteria.find((k) => k.kode === "C1")?.tipe === "BENEFIT"
        ? Math.max(...matriks.map((item) => item.penghasilan))
        : Math.min(...matriks.map((item) => item.penghasilan)),
    jmlTanggungan:
      kriteria.find((k) => k.kode === "C2")?.tipe === "BENEFIT"
        ? Math.max(...matriks.map((item) => item.jmlTanggungan))
        : Math.min(...matriks.map((item) => item.jmlTanggungan)),
    nilai:
      kriteria.find((k) => k.kode === "C3")?.tipe === "BENEFIT"
        ? Math.max(...matriks.map((item) => item.nilai))
        : Math.min(...matriks.map((item) => item.nilai)),
    rumah:
      kriteria.find((k) => k.kode === "C4")?.tipe === "BENEFIT"
        ? Math.max(...matriks.map((item) => item.rumah))
        : Math.min(...matriks.map((item) => item.rumah)),
    listrik:
      kriteria.find((k) => k.kode === "C5")?.tipe === "BENEFIT"
        ? Math.max(...matriks.map((item) => item.listrik))
        : Math.min(...matriks.map((item) => item.listrik)),
  };
  const negatif: SolusiIdeal["negatif"] = {
    penghasilan:
      kriteria.find((k) => k.kode === "C1")?.tipe === "COST"
        ? Math.max(...matriks.map((item) => item.penghasilan))
        : Math.min(...matriks.map((item) => item.penghasilan)),
    jmlTanggungan:
      kriteria.find((k) => k.kode === "C2")?.tipe === "COST"
        ? Math.max(...matriks.map((item) => item.jmlTanggungan))
        : Math.min(...matriks.map((item) => item.jmlTanggungan)),
    nilai:
      kriteria.find((k) => k.kode === "C3")?.tipe === "COST"
        ? Math.max(...matriks.map((item) => item.nilai))
        : Math.min(...matriks.map((item) => item.nilai)),
    rumah:
      kriteria.find((k) => k.kode === "C4")?.tipe === "COST"
        ? Math.max(...matriks.map((item) => item.rumah))
        : Math.min(...matriks.map((item) => item.rumah)),
    listrik:
      kriteria.find((k) => k.kode === "C5")?.tipe === "COST"
        ? Math.max(...matriks.map((item) => item.listrik))
        : Math.min(...matriks.map((item) => item.listrik)),
  };
  return { positif, negatif };
}

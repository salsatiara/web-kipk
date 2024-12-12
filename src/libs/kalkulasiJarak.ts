type Alternatif = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
  jarakPositif: number;
  jarakNegatif: number;
  preferensi: number;
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

export default function kalkulasiJarak(
  alternatif: Alternatif,
  matriks: Matriks,
  SolusiIdeal: SolusiIdeal
): Alternatif {
  alternatif.map((item, index) => {
    item.jarakPositif = Math.sqrt(
      (matriks[index].penghasilan - SolusiIdeal.positif.penghasilan) ** 2 +
        (matriks[index].jmlTanggungan - SolusiIdeal.positif.jmlTanggungan) **
          2 +
        (matriks[index].nilai - SolusiIdeal.positif.nilai) ** 2 +
        (matriks[index].rumah - SolusiIdeal.positif.rumah) ** 2 +
        (matriks[index].listrik - SolusiIdeal.positif.listrik) ** 2
    );
    item.jarakNegatif = Math.sqrt(
      (matriks[index].penghasilan - SolusiIdeal.negatif.penghasilan) ** 2 +
        (matriks[index].jmlTanggungan - SolusiIdeal.negatif.jmlTanggungan) **
          2 +
        (matriks[index].nilai - SolusiIdeal.negatif.nilai) ** 2 +
        (matriks[index].rumah - SolusiIdeal.negatif.rumah) ** 2 +
        (matriks[index].listrik - SolusiIdeal.negatif.listrik) ** 2
    );
  });

  alternatif.map((item) => {
    item.preferensi =
      item.jarakNegatif / (item.jarakNegatif + item.jarakPositif);
  });

  return alternatif;
}

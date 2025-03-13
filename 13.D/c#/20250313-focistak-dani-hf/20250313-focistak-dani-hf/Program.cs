using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250313_focistak_dani_hf
{
    internal class Jatekos
    {
        public string Nev { get; set; }
        public DateTime SzuletesiDatum { get; set; }
        public DateTime? HalalozasiDatum { get; set; }
        public int GolokAzEvben { get; set; }
        public int GolokAzElozoEvben { get; set; }
        public string CsapatanakOrszaga { get; set; }
        public Jatekos(string nev, DateTime szulDatum, DateTime? halalDatum, int golokEbbenAzEvben, int golokAzElozoEvben, string orszag)
        {
            this.Nev = nev;
            this.SzuletesiDatum = szulDatum;
            this.HalalozasiDatum = halalDatum;
            this.GolokAzEvben = golokEbbenAzEvben;
            this.GolokAzElozoEvben = golokAzElozoEvben;
            this.CsapatanakOrszaga = orszag;
        }
    }
    internal class Program
    {
        internal static List<Jatekos> jatekosLista = new List<Jatekos>();
        static void Main(string[] args)
        {
            // 1.feladat
            StreamReader reader = new StreamReader("../../file.txt");

            reader.ReadLine();

            while (!reader.EndOfStream)
            {
                string[] line = reader.ReadLine().Split(';');

                DateTime? halalozas = null;
                if (DateTime.TryParse(line[2], out DateTime h))
                {
                    halalozas = h;
                }

                jatekosLista.Add(new Jatekos(
                    line[0],
                    Convert.ToDateTime(line[1]),
                    halalozas,
                    Convert.ToInt32(line[3]),
                    Convert.ToInt32(line[4]),
                    line[5]
                    )
                );
            }

            Console.WriteLine($"Játékosok száma: {jatekosLista.Count}\n");

            // 2.feladat
            Jatekos[] elhunytJatekosok = jatekosLista.FindAll(jatekos => jatekos.HalalozasiDatum != null).ToArray();

            Console.WriteLine($"Élő játékosok száma: {jatekosLista.Count - elhunytJatekosok.Length}");
            Console.WriteLine($"Elhunyt játékosok: {elhunytJatekosok.Length}");

            // 3.feladat
            Jatekos legidosebbEloJatekos = jatekosLista[0];
            for (int i = 1; i < jatekosLista.Count; i++)
            {
                if(legidosebbEloJatekos.SzuletesiDatum > jatekosLista[i].SzuletesiDatum)
                {
                    legidosebbEloJatekos = jatekosLista[i];
                }
            }
            Console.WriteLine("\nLegidősebb élő játékos:");
            Console.WriteLine($"Név: {legidosebbEloJatekos.Nev}\tSzül. Dátum: {legidosebbEloJatekos.SzuletesiDatum} \t Halál Dátum: Még él");
            Console.WriteLine($"Gólok előző évben: {legidosebbEloJatekos.GolokAzElozoEvben}\tGólok ebben az évben: {legidosebbEloJatekos.GolokAzEvben}\tOrszág: {legidosebbEloJatekos.CsapatanakOrszaga}");
            // Hibas a pelda kep: Nem a legidősebb hanem a legfiatalbbat írja (bro 2009-ben született a kepen xd)

            Jatekos legfiatalabbElhunytJatekos = elhunytJatekosok[0];
            for (int i = 1; i < elhunytJatekosok.Length; i++)
            {
                if((legfiatalabbElhunytJatekos.HalalozasiDatum - legfiatalabbElhunytJatekos.SzuletesiDatum) > (elhunytJatekosok[i].HalalozasiDatum - elhunytJatekosok[i].SzuletesiDatum))
                {
                    legfiatalabbElhunytJatekos = elhunytJatekosok[i];
                }
            }
            Console.WriteLine("\nLegfiatalabb halott:");
            Console.WriteLine($"Név: {legfiatalabbElhunytJatekos.Nev}\tSzül. Dátum: {legfiatalabbElhunytJatekos.SzuletesiDatum} \t Halál Dátum: {legfiatalabbElhunytJatekos.HalalozasiDatum}");
            Console.WriteLine($"Gólok előző évben: {legfiatalabbElhunytJatekos.GolokAzElozoEvben}\tGólok ebben az évben: {legfiatalabbElhunytJatekos.GolokAzEvben}\tOrszág: {legfiatalabbElhunytJatekos.CsapatanakOrszaga}\n");

            // 4. feladat
            Dictionary<string, int> orszagokJatekosai = new Dictionary<string, int>();
            foreach(Jatekos jatekos in jatekosLista)
            {
                if(!orszagokJatekosai.ContainsKey(jatekos.CsapatanakOrszaga))
                {
                    orszagokJatekosai.Add(jatekos.CsapatanakOrszaga, 1);
                } else
                {
                    orszagokJatekosai[jatekos.CsapatanakOrszaga]++;
                }
            }
            foreach(var orszag in orszagokJatekosai)
            {
                Console.WriteLine($"{orszag.Key} országban játszó játékosok száma: {orszag.Value}");
            }

            // 5.feladat
            Console.WriteLine("\n");
            Dictionary<string, int> orszagGoljai = new Dictionary<string, int>();
            foreach (Jatekos jatekos in jatekosLista)
            {
                if(!orszagGoljai.ContainsKey(jatekos.CsapatanakOrszaga)) 
                {
                    orszagGoljai.Add(jatekos.CsapatanakOrszaga, jatekos.GolokAzEvben);
                } else
                {
                    if (orszagGoljai[jatekos.CsapatanakOrszaga] < jatekos.GolokAzEvben)
                    {
                        orszagGoljai[jatekos.CsapatanakOrszaga] = jatekos.GolokAzEvben;
                    }
                }
            }
            foreach (var orszag in orszagGoljai)
            {
                Console.WriteLine($"{orszag.Key} országban a legtöbb gól: {orszag.Value}");   
            }
            // Hibas a pleda kep: A képen a "Góljai az előző évben"-t számolja és nem a jelen évet (szerintem)

            // 6. feladat
            Jatekos legkisebbKulJatekos = jatekosLista[0];
            for (int i = 1; i < jatekosLista.Count; i++)
            {
                Jatekos jatekos = jatekosLista[i];

                if((jatekos.GolokAzElozoEvben - jatekos.GolokAzEvben) < (legkisebbKulJatekos.GolokAzElozoEvben - legkisebbKulJatekos.GolokAzEvben))
                {
                    legkisebbKulJatekos = jatekos;
                }
            }
            Console.WriteLine("\nFájl tartalma:");
            string halotti = "Még él";
            if(legkisebbKulJatekos.HalalozasiDatum != null)
            {
                halotti = legkisebbKulJatekos.HalalozasiDatum.ToString();
            }
            Console.WriteLine($"Név: {legkisebbKulJatekos.Nev} \t Szül.Dátum: {legkisebbKulJatekos.SzuletesiDatum} \t Halál dátum: {halotti}");
            Console.WriteLine($"Gólok előző évben: {legkisebbKulJatekos.GolokAzEvben} \t Gólok ebben az évben: {legkisebbKulJatekos.GolokAzElozoEvben} \t Ország: {legkisebbKulJatekos.CsapatanakOrszaga}");

            StreamWriter writer = new StreamWriter("../../legkevesebbkulonbsegu.txt");
            writer.WriteLine("Játékos neve;Születési dátuma;Halálozási dátuma (ha van);Góljai ebben az évben;Góljai az előző évben;Csapatja országa");
            writer.WriteLine($"{legkisebbKulJatekos.Nev};{legkisebbKulJatekos.SzuletesiDatum};{legkisebbKulJatekos.HalalozasiDatum};{legkisebbKulJatekos.GolokAzEvben};{legkisebbKulJatekos.GolokAzElozoEvben};{legkisebbKulJatekos.CsapatanakOrszaga}");

            // 7.feladat
            Console.Write("\n\nAdjon meg egy országot: ");
            string bekertOrszag = Console.ReadLine();
            Jatekos[] jatekosokAzOrszagbol = jatekosLista.FindAll(jatekos => jatekos.CsapatanakOrszaga.ToLower() == bekertOrszag.ToLower()).ToArray();
            if(jatekosokAzOrszagbol.Length == 0)
            {
                Console.WriteLine("Nem található ez az ország az adat táblában");
            } 
            else
            {
                for (int i = 0; i < 3 && i < jatekosokAzOrszagbol.Length; i++)
                {
                    Jatekos jatekos = jatekosokAzOrszagbol[i];

                    halotti = "Még él";
                    if (jatekos.HalalozasiDatum != null)
                    {
                        halotti = jatekos.HalalozasiDatum.ToString();
                    }
                    Console.WriteLine($"Név: {jatekos.Nev} \t Szül.Dátum: {jatekos.SzuletesiDatum} \t Halál dátum: {halotti}");
                    Console.WriteLine($"Gólok előző évben: {jatekos.GolokAzEvben} \t Gólok ebben az évben: {jatekos.GolokAzElozoEvben} \t Ország: {jatekos.CsapatanakOrszaga}\n");
                }
            }
            

            Console.ReadLine();
        }
    }
}

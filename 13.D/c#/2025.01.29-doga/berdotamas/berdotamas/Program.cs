using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace berdotamas
{
    internal class Sportolok
    {
        public string jatekos_nev { get; set; }
        public int eletkor { get; set; }
        public int jatekos_szam { get; set; }
        public bool aktiv { get; set; }
        public Sportolok()
        {

        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Sportolok> sportlista = new List<Sportolok>();

            // 1. feladat
            StreamReader reader = new StreamReader("0129.txt");

            reader.ReadLine();

            while (reader.Peek() > -1)
            {
                string[] line = reader.ReadLine().Split(';');

                sportlista.Add(new Sportolok
                {
                    jatekos_nev = line[0],
                    eletkor = Convert.ToInt16(line[1]),
                    jatekos_szam = Convert.ToInt16(line[2]),
                    aktiv = line[3] == "Aktív"
                });
            }

            // 2.feladat

            int sportolokOsszEletkora = 0;
            foreach (Sportolok sportolo in sportlista)
            {
                sportolokOsszEletkora += sportolo.eletkor;
            }

            Console.WriteLine($"2. Feladat:\n\tSportolók átlag életkora: {(double)sportolokOsszEletkora / (double)sportlista.Count}");

            // 3.feladat
            Console.WriteLine("\n3.Feladat:");

            foreach (Sportolok sportolo in sportlista.OrderBy(x => x.jatekos_nev))
            {
                if(sportolo.aktiv)
                {
                    Console.WriteLine($"\t{sportolo.jatekos_nev}");
                }
            }

            // 4.feladat
            Console.WriteLine("\n4.Feladat:");

            foreach (Sportolok sportolo in sportlista.OrderBy(x => x.jatekos_nev))
            {
                if(sportolo.eletkor == 20)
                {
                    Console.WriteLine($"\t{sportolo.jatekos_nev}");
                }
            }

            // 5. feladat
            Console.WriteLine("\n5.Feladat: Kész");

            StreamWriter writer = new StreamWriter("mindensportoloadata.txt");

            foreach (Sportolok sportolo in sportlista)
            {
                if (!sportolo.aktiv)
                {
                    writer.WriteLine($"{sportolo.jatekos_nev};{sportolo.eletkor};{sportolo.jatekos_szam};{sportolo.aktiv}");
                }
            }
            writer.Close();

            Console.ReadLine();
        }
    }
}
// Berdó Tamás ~ BT ~ mcitomi ~ MeowMeow
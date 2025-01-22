using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250122_pilotak_dani
{
    struct pilota {
        public string nev;
        public string szuletesi_datum;
        public string nemzetiseg;
        public string rajtszam;
    }
    internal class Program
    {
        
        static void Main(string[] args)
        {
            List<pilota> pilotaList = new List<pilota>();

            StreamReader sr = new StreamReader("../../pilotak.csv");
            sr.ReadLine();

            while (sr.Peek() >= 1)
            {
                string[] line = sr.ReadLine().Split(';');

                pilotaList.Add(new pilota { 
                    nev = line[0], 
                    szuletesi_datum = line[1], 
                    nemzetiseg = line[2], 
                    rajtszam = line[3] 
                });
            }

            //foreach (pilota pilotaValues  in pilotaList)
            //{
            //    Console.WriteLine(pilotaValues.nev);
            //}

            Console.WriteLine($"3. feladat: {pilotaList.Count}");

            Console.WriteLine($"4. feladat: {pilotaList[pilotaList.Count-1].nev}");

            Console.WriteLine("5. feladat:");

            pilota legkisebbRajtszamu = new pilota {
                nev = "",
                szuletesi_datum = "",
                rajtszam = "1000",
                nemzetiseg = ""
            };

            Dictionary<int, int> rajtszamok = new Dictionary<int, int>();

            foreach (pilota pilotaValues in pilotaList)
            {

                int pilotaBirthYear = Convert.ToInt16(pilotaValues.szuletesi_datum.Split('.')[0]);
                if (pilotaBirthYear < 1901)
                {
                    Console.WriteLine($"\t{pilotaValues.nev} ({pilotaValues.szuletesi_datum}.)");
                }

                if(int.TryParse(pilotaValues.rajtszam, out int pilotaRajtszam))
                {
                    if (int.Parse(legkisebbRajtszamu.rajtszam) > pilotaRajtszam)
                    {
                        legkisebbRajtszamu = pilotaValues;
                    }

                    if(rajtszamok.ContainsKey(pilotaRajtszam))
                    {
                        rajtszamok[pilotaRajtszam]++;
                    } else
                    {
                        rajtszamok.Add(pilotaRajtszam, 1);
                    }
                }
            }

            Console.WriteLine($"6. feladat: {legkisebbRajtszamu.nemzetiseg}");

            Console.Write("7. feladat: ");
            foreach (var rajtszam in rajtszamok)
            {
                if(rajtszam.Value > 1)
                {
                    Console.Write($"{rajtszam.Key} ");   
                }
            }

            Console.ReadLine();
        }
    }
}

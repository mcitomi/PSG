using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace BerdoTamas_Focistak
{
    internal class Focistak
    {
        public string Neve { get; set; }
        public int SzuletesiEv { get; set; }
        public string Poszt { get; set; }
        public string Nemzetiseg { get; set; }
        public Focistak(string neve, int szulev, string poszt, string nemzetiseg) {
            this.Neve = neve;
            this.SzuletesiEv = szulev;
            this.Poszt = poszt;
            this.Nemzetiseg = nemzetiseg;
        }
    }
    internal class Program
    {   
        internal static List<Focistak> fociLista = new List<Focistak>();
        static void Main(string[] args)
        {
            // 2. feladat
            StreamReader reader = new StreamReader("../../focistak.csv");

            reader.ReadLine();

            while (!reader.EndOfStream)
            {
                string[] line = reader.ReadLine().Split(';');

                fociLista.Add(new Focistak(line[0], Convert.ToInt16(line[1]), line[2], line[3]));
            }

            // 3. feladat
            Console.WriteLine($"3.Feladat:\nAz adatszerkezet {fociLista.Count} példányt tartalmaz.");

            // 4. feladat
            Focistak legidosebbFocista = fociLista[0];
            for (int i = 1; i < fociLista.Count; i++)
            {
                if(legidosebbFocista.SzuletesiEv > fociLista[i].SzuletesiEv)
                {
                    legidosebbFocista = fociLista[i];
                }
            }

            Console.WriteLine($"4.Feladat\nA legidősebb játékos: {legidosebbFocista.Neve} ({legidosebbFocista.SzuletesiEv}), {legidosebbFocista.Poszt} - {legidosebbFocista.Nemzetiseg}");

            // 5. feladat
            Console.WriteLine("5.Feladat\nÍrjon be egy nemzetiséget:");
            string keresettNemzetiseg = Console.ReadLine();
            Focistak[] keresettNemzetiseguFocistak = fociLista.FindAll(focista => focista.Nemzetiseg == keresettNemzetiseg).ToArray();

            if (keresettNemzetiseguFocistak.Length == 0)
            {
                Console.WriteLine("Nem található ilyen nemzetiség!");
            }

            foreach (Focistak focista in keresettNemzetiseguFocistak)
            {
                Console.WriteLine($"{focista.Neve} ({focista.SzuletesiEv}), {focista.Poszt} - {focista.Nemzetiseg}");
            }

            // 6. feladat
            Console.WriteLine("6.Feladat\nÍrjon be egy posztot:");
            string keresettPoszt = Console.ReadLine();
            Focistak[] keresettPosztuFocistak = fociLista.FindAll(focista => focista.Poszt == keresettPoszt).ToArray();

            if(keresettPosztuFocistak.Length == 0)
            {
                Console.WriteLine("Nem található ilyen poszt!");
            }

            foreach (Focistak focista in keresettPosztuFocistak)
            {
                Console.WriteLine($"{focista.Neve} ({focista.SzuletesiEv}), {focista.Poszt} - {focista.Nemzetiseg}");
            }

            Console.ReadLine();
        }
    }
}

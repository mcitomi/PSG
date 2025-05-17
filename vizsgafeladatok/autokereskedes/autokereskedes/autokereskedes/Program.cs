using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace autokereskedes
{
    class Autok
    {
        public string Gyarto { get; set; }
        public string Tipus { get; set; }
        public string Szin { get; set; }
        public int Ar { get; set; }
        public Autok(string gyarto, string tipus, string szin, int ar)
        {
            this.Gyarto = gyarto;
            this.Tipus = tipus;
            this.Szin = szin;
            this.Ar = ar;
        }
    }
    internal class Program
    {
        
        static public List<Autok> autokListaja = new List<Autok>();

        static public List<Autok> FilterAutok(string szin)
        {
            return autokListaja.FindAll(x => x.Szin.ToLower().Contains(szin.ToLower()));
        }


        static void Main(string[] args)
        {
            try
            {
                StreamReader reader = new StreamReader("../../autok.csv");

                reader.ReadLine();

                while (!reader.EndOfStream)
                {
                    string[] line = reader.ReadLine().Split(';');                 
                    
                    autokListaja.Add(new Autok(line[0], line[1], line[2], Convert.ToInt32(line[3])));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Az beviteli fájl nem létezik!");
            }

            Console.WriteLine($"2. Feladat:\nA lista {autokListaja.Count} elemet tartalmaz.\n");


            Console.Write("3. Feladat:\nÍrjon be egy márkanevet: ");
            string automarka = Console.ReadLine();

            autokListaja.FindAll(x => x.Gyarto.ToLower().Contains(automarka.ToLower())).ForEach(x => Console.WriteLine($"{x.Gyarto} - {x.Tipus} - {x.Szin} ({x.Ar})"));

            Console.WriteLine("\n5. Feladat:");
            FilterAutok("fehér").ForEach(x => Console.WriteLine($"{x.Gyarto} - {x.Tipus} - {x.Szin} ({x.Ar})"));

            Console.WriteLine("\n6. Feladat:");
            Autok legdragabb = autokListaja[0];
            foreach (Autok auto in autokListaja)
            {
                if(auto.Ar > legdragabb.Ar)
                {
                    legdragabb = auto;
                }
            }

            Console.WriteLine($"{legdragabb.Gyarto} - {legdragabb.Tipus} - {legdragabb.Szin} ({legdragabb.Ar})");

            Console.WriteLine("\n7. Feladat:");

            Dictionary<string, int> gyartok = new Dictionary<string, int>();

            autokListaja.ForEach(auto =>
            {
                if (!gyartok.ContainsKey(auto.Gyarto))
                {
                    gyartok.Add(auto.Gyarto, 1);
                }
                else
                {
                    gyartok[auto.Gyarto]++;
                }
            });

            foreach (var item in gyartok)
            {
                Console.WriteLine($"{item.Key}: {item.Value} darab");
            }

            Console.ReadLine();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250212_karacsonyCLI
{
    class NapiMunka
    {
        public static int KeszultDb { get; private set; }
        public int Nap { get; private set; }
        public int HarangKesz { get; private set; }
        public int HarangEladott { get; private set; }
        public int AngyalkaKesz { get; private set; }
        public int AngyalkaEladott { get; private set; }
        public int FenyofaKesz { get; private set; }
        public int FenyofaEladott { get; private set; }

        public NapiMunka(string sor)
        {
            string[] s = sor.Split(';');
            Nap = Convert.ToInt32(s[0]);
            HarangKesz = Convert.ToInt32(s[1]);
            HarangEladott = Convert.ToInt32(s[2]);
            AngyalkaKesz = Convert.ToInt32(s[3]);
            AngyalkaEladott = Convert.ToInt32(s[4]);
            FenyofaKesz = Convert.ToInt32(s[5]);
            FenyofaEladott = Convert.ToInt32(s[6]);

            NapiMunka.KeszultDb += HarangKesz + AngyalkaKesz + FenyofaKesz;
        }

        public int NapiBevetel()
        {
            return -(HarangEladott * 1000 + AngyalkaEladott * 1350 + FenyofaEladott * 1500);
        }
    }
    internal class Program
    {
        public static List<NapiMunka> munkaList = new List<NapiMunka>();
        static void Main(string[] args)
        {
            StreamReader reader = new StreamReader("../../diszek.txt");

            while (reader.Peek() > -1)
            {
                munkaList.Add(new NapiMunka(reader.ReadLine()));
            }

            // 4. feladat
            
            Console.WriteLine($"4. feladat: Összesen {NapiMunka.KeszultDb} darab dísz készült.");

            // 5.feladat
            bool talalt = false;
            int i = 0;
            while (!talalt)
            {
                if (munkaList[i].AngyalkaKesz == 0 || munkaList[i].HarangKesz == 0 || munkaList[i].FenyofaKesz == 0)
                {
                    talalt = true;
                }
                i++;
            }

            Console.WriteLine($"5. feladat: " + (talalt ? "Volt" : "Nem volt") + " olyan nap, amikor egyetlen dísz sem készült.");

            // 6.fealdat
            Console.WriteLine("6. Feladat:");
            bool ervenyesBemenet = false;
            while (!ervenyesBemenet)
            {
                Console.Write("Adja meg a keresett napot [1 ... 40]: ");
                string userBemenet = Console.ReadLine();
                if(int.TryParse(userBemenet, out int napSzama))
                {
                    if(napSzama >= 1 && napSzama <= 40)
                    {
                        ervenyesBemenet = true;

                        int HarangKeszleten = 0;
                        int AngyalKeszleten = 0;
                        int FenyofaKeszleten = 0;

                        for (int j = 0; j < napSzama; j++)
                        {
                            NapiMunka nap = munkaList[j];

                            HarangKeszleten = (nap.HarangKesz + HarangKeszleten) + nap.HarangEladott;
                            AngyalKeszleten = (nap.AngyalkaKesz + AngyalKeszleten) + nap.AngyalkaEladott;
                            FenyofaKeszleten = (nap.FenyofaKesz + FenyofaKeszleten) + nap.FenyofaEladott;
                        }

                        Console.WriteLine($"\tA(z) {napSzama}. nap végén {HarangKeszleten} harang, {AngyalKeszleten} angyalka és {FenyofaKeszleten} fenyőfa maradt készleten.");
                    }
                }
            }

            // 7. feladat

            Dictionary<string, int> eladottDiszek = new Dictionary<string, int> ();
            eladottDiszek.Add("angyal", 0);
            eladottDiszek.Add("harang", 0);
            eladottDiszek.Add("fenyo", 0);

            foreach (NapiMunka nap in munkaList)
            {
                eladottDiszek["angyal"] = eladottDiszek["angyal"] + Math.Abs(nap.AngyalkaEladott);
                eladottDiszek["harang"] = eladottDiszek["harang"] + Math.Abs(nap.HarangEladott);
                eladottDiszek["fenyo"] = eladottDiszek["fenyo"] + Math.Abs(nap.FenyofaEladott);
            }

            Console.WriteLine($"7. feladat: Legtöbbet eladott dísz: {eladottDiszek.Values.Max()}");
            
            if(eladottDiszek["angyal"] == eladottDiszek["harang"])
            {
                Console.WriteLine("\tAngyalka\n\tHarang");
            }
            else
            if (eladottDiszek["angyal"] == eladottDiszek["fenyo"])
            {
                Console.WriteLine("\tAngyalka\n\tFenyőfa");
            }
            else
            if (eladottDiszek["harang"] == eladottDiszek["fenyo"])
            {
                Console.WriteLine("\tHarang\n\tFenyőfa");
            }

            // 8. feladat

            StreamWriter writer = new StreamWriter("../../bevetel.txt");

            int napokAmikElertekATizezret = 0;
            foreach (NapiMunka nap in munkaList)
            {
                int bevetel = nap.NapiBevetel();
                
                if (bevetel >= 10000)
                {
                    writer.WriteLine($"{nap.Nap}:{bevetel}");
                    napokAmikElertekATizezret++;
                }
            }

            writer.WriteLine($"{napokAmikElertekATizezret} napon volt legalább 10000Ft a bevétel.");
            writer.Close();

            Console.ReadLine();
        }
    }
}
// https://infojegyzet.hu/erettsegi/informatika-ismeretek/kozep-prog-2021maj/programozas-feladat.pdf
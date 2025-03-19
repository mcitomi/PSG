using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250319_tanulok_dani
{
    public class Tanulok
    {
        public string Name { get; set; }
        public byte Age { get; set; }
        public byte Class { get; set; }
        public byte Grade { get; set; }

        public Tanulok (string name, byte age, byte tanuloclass, byte grade)
        {
            Name = name;
            Age = age;
            Class = tanuloclass;
            Grade = grade;
        }

        public static List<Tanulok> fajlBe(string path)
        {
            List<Tanulok> ki = new List<Tanulok>();
            StreamReader reader = new StreamReader(path);
            reader.ReadLine();
            while (!reader.EndOfStream)
            {
                string[] line = reader.ReadLine().Split(';');
                byte age = byte.Parse(line[1]);
                byte _class = byte.Parse(line[2]);
                byte grade = byte.Parse(line[3]);
                ki.Add(new Tanulok(line[0], age, _class, grade));
            }
            return ki;
        }

        public override string ToString()
        {
            return $"Neve: {Name}, " +
                $"Életkor: {Age}, " +
                $"Osztály: {Class}, " +
                $"Jegy: {Grade}";
        }
    }
    internal class Program
    {
        internal static List<Tanulok> tanulok = Tanulok.fajlBe("tanulok.txt");
        static void Main(string[] args)
        {
            Console.WriteLine("Adj meg egy jegyet:");

            int jegy = Convert.ToInt32(Console.ReadLine());

            List<Tanulok> jegy_felett = tanulok.Where(x => x.Grade >= jegy).ToList();

            if(jegy_felett.Count >= 5)
            {
                for (int i = 0; i < 5; i++)
                {
                    Console.WriteLine(jegy_felett[i].ToString());
                }
            } else
            {
                for (int i = 0; i < jegy_felett.Count; i++)
                {
                    Console.WriteLine(jegy_felett[i].ToString());
                }
            }

            List<Tanulok> tanulok_18nalidosebb = tanulok.Where(x => x.Age > 18).ToList();
            Console.WriteLine($"18 évnél idősebb diákok száma:{tanulok_18nalidosebb.Count}");

            Tanulok legjobbDiak = tanulok.Find(x => x.Grade == tanulok.Max(y => y.Grade));
            Console.WriteLine($"A legjobb diák: {legjobbDiak.Name}, {legjobbDiak.Grade} jeggyel.");

            Dictionary<int, List<Tanulok>> osztalyok = new Dictionary<int, List<Tanulok>>();

            foreach (Tanulok tanulo in tanulok)
            {
                if(osztalyok.ContainsKey(tanulo.Class))
                {
                    osztalyok[tanulo.Class].Add(tanulo);
                } else
                {
                    osztalyok.Add(tanulo.Class, new List<Tanulok> { tanulo });
                }
            }

            foreach (var osztaly in osztalyok.Keys)
            {
                Console.WriteLine($"{osztaly}, Osztalyok atlagjegye: {osztalyok[osztaly].Average(x => x.Grade).ToString("0.0")} - {osztalyok[osztaly].Count}");
            }

            Console.ReadLine();
        }
    }
}

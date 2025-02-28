using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250226_feladaz0221
{
    public class Fileok
    {
        public string fajlnev { get; set; }
        public int meret { get; set; }
        public DateTime keszitesDatuma { get; set; }
        public DateTime modositasDatum { get; set; }
        public string tipus { get; set; }
        public string tulajdoson { get; set; }

        public Fileok() { }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Fileok> list = new List<Fileok>();
            List<Fileok> kepekList = new List<Fileok>();

            StreamReader reader = new StreamReader("../../feladat_0221.txt");

            reader.ReadLine();

            while (reader.Peek() > -1)
            {
                string ssor = reader.ReadLine();
                //Console.WriteLine(ssor);
                
                string[] sor = ssor.Split(';');
                
                if(DateTime.TryParse(sor[3], out DateTime modositasDatuma))
                {
                    list.Add(new Fileok
                    {
                        fajlnev = sor[0],
                        meret = Convert.ToInt32(sor[1]),
                        keszitesDatuma = Convert.ToDateTime(sor[2]),
                        modositasDatum = modositasDatuma,
                        tipus = sor[4],
                        tulajdoson = sor[5]
                    });
                } 
                else
                {
                    list.Add(new Fileok
                    {
                        fajlnev = sor[0],
                        meret = Convert.ToInt32(sor[1]),
                        keszitesDatuma = Convert.ToDateTime(sor[2]),
                        modositasDatum = DateTime.MinValue,
                        tipus = sor[4],
                        tulajdoson = sor[5]
                    });
                }
            }

            reader.Close();

            Console.WriteLine($"{list.FindAll(x => x.modositasDatum != DateTime.MinValue).ToList().Count} db elemet módosítottak");

            foreach (Fileok file in list)
            {
                if(file.tipus == "png" || file.tipus == "jpg")
                {
                    kepekList.Add(file);
                }
            }


            Console.WriteLine("Legutoljara keszult kep(ek):");

            DateTime legujabbKepekDatuma = kepekList.OrderByDescending(kep => kep.keszitesDatuma).ToList()[0].keszitesDatuma;

            foreach (Fileok kep in kepekList)
            {
                if(legujabbKepekDatuma == kep.keszitesDatuma)
                {
                    Console.WriteLine($"{kep.fajlnev} {kep.keszitesDatuma}");
                }
            }

            Console.WriteLine("Legrégebben módosított kép(ek):");
            DateTime legkesobbModositott = kepekList.OrderByDescending(kep => kep.modositasDatum).ToList()[0].modositasDatum;
            foreach (Fileok kep in kepekList)
            {
                if (legkesobbModositott == kep.modositasDatum)
                {
                    Console.WriteLine($"{kep.fajlnev} {kep.modositasDatum}");
                }
            }

            StreamWriter userWriter = new StreamWriter("../../user.txt");
            StreamWriter guestWriter = new StreamWriter("../../guest.txt");
            StreamWriter adminWriter = new StreamWriter("../../admin.txt");

            foreach(Fileok kep in kepekList)
            {
                if(kep.modositasDatum != DateTime.MinValue)
                {
                    if(kep.tulajdoson == "guest")
                    {
                        guestWriter.WriteLine($"{kep.fajlnev};{kep.meret};{kep.keszitesDatuma};{kep.modositasDatum};{kep.tulajdoson}"); 
                    }

                    if (kep.tulajdoson == "user1")
                    {
                        userWriter.WriteLine($"{kep.fajlnev};{kep.meret};{kep.keszitesDatuma};{kep.modositasDatum};{kep.tulajdoson}");

                    }

                    if (kep.tulajdoson == "admin")
                    {
                        adminWriter.WriteLine($"{kep.fajlnev};{kep.meret};{kep.keszitesDatuma};{kep.modositasDatum};{kep.tulajdoson}");

                    }
                }
            }
            userWriter.Close();
            adminWriter.Close();
            guestWriter.Close();

            Console.ReadLine();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250312_MORZE
{
    class MorzeKod
    {
        public char Kulcs { get; set; }
        public string Kod { get; set; }

        public MorzeKod(char kulcs, string kod) { 
            Kulcs= kulcs;
            Kod= kod;
        }
    }

    class Idezet
    {
        public string Idezete {  get; set; }
        public string Kolto {  get; set; }

        public Idezet (string idezet, string kolto)
        {
            Idezete = idezet;
            Kolto = kolto;
        }
    }

    internal class Program
    {
        internal static List<MorzeKod> morzeKods = new List<MorzeKod>();
        internal static List<Idezet> morzeIdezetek = new List<Idezet>();
        static string Morze2Szöveg(string morzeSzoveg)
        {
            int kihagyottKarakterek = 0;
           
            string dekodoltSzoveg = "";

            //string[] morzeSor = morzeSzoveg.Split(' ');
            
            for (int i = 0; i < morzeSzoveg.Length; i++)
            {
                if (morzeSzoveg[i] == ' ')
                {
                    kihagyottKarakterek++;

                    if(kihagyottKarakterek == 7)
                    {
                        dekodoltSzoveg += " ";
                    }

                } else
                {
                    kihagyottKarakterek = 0;
                    //dekodoltSzoveg += morzeKods.Find(kod => kod.Kod == morzeSzoveg[i]).Kulcs;
                }
            }
            return dekodoltSzoveg;
        }

        static void Main(string[] args)
        {
            StreamReader reader = new StreamReader("../../morzeabc.txt");

            reader.ReadLine();

            while (!reader.EndOfStream)
            {
                string[] elements = reader.ReadLine().Split('\t');

                morzeKods.Add(new MorzeKod(elements[0][0], elements[1]));
            }   // elements[0][0] -> első string elem első betűje

            reader.Close();

            // 3. feladat
            Console.WriteLine($"Összesen {morzeKods.Count} karakter van a fájlban.");

            // 4. feladat
            Console.Write("Kérek egy karaktert: ");
            char karakter = Console.ReadLine().ToUpper()[0];

            try
            {
                string morzeKod = morzeKods.Find(kod => kod.Kulcs == karakter).Kod;

                Console.WriteLine($"A {karakter} karakter morze kódja: {morzeKod}");
            } catch
            {
                Console.WriteLine("Nem található a kódtárban ilyen karakter!");
            }

            // 5 .feladat
            reader = new StreamReader("../../morze.txt");

            while (!reader.EndOfStream)
            {
                string[] idezetAdatok = reader.ReadLine().Split(';'); // index: 0 - költő, 1 - idézet

                morzeIdezetek.Add(new Idezet (idezetAdatok[0], idezetAdatok[1]));
            }

            reader.Close();

            Console.WriteLine(Morze2Szöveg(morzeIdezetek[0].Kolto));


            Console.ReadLine();
        }
    }
}

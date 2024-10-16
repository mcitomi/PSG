using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace c20241016
{
    class Jargany
    {
        private bool autoE;
        public bool AutoE
        {
            get
            {
                return autoE;
            }
            private set
            {
                autoE = value;
            }
        }

        private int kerekei_szama;
        public int Kerekei_Szama
        {
            get
            {
                return kerekei_szama;
            }
            set
            {
                if (value < 2)
                {
                    throw new Exception("A kerekei száma nem lehet kettőnél kisebb!");
                }
                else if (value == 2)
                {
                    AutoE = false;
                    kerekei_szama = value;
                }
                else if (value == 4)
                {
                    AutoE = true;
                    kerekei_szama = value;
                }
                else
                {
                    throw new Exception("A kerekei száma nem lehet három, vagy négynél több!");
                }
            }
        }

        private string model;
        public string Model
        {
            get
            {
                return model;
            }
            set
            {
                if (value.Length < 3 || value.Length > 15)
                {
                    throw new Exception("Hibás modell hossz!");
                }
                else
                {
                    model = value;
                }
            }
        }

        public enum markaEnum
        {
            Opel,
            Suzuki,
            Ford,
            Lada,
            Toyota
        }
        private markaEnum marka;
        public markaEnum Marka
        {
            get
            {
                return marka;
            } 
            set
            {
                marka = value;
            }
        }

        private double ara;
        public double Ara
        {
            get
            {
                return ara;
            }
            set
            {
                ara = value;
            }
        }

        private double veteliAra = 0;
        public double VeteliAra
        {
            get
            {
                return veteliAra;
            }
            set
            {
                veteliAra = value;
            }
        }

        private int allapota;
        public int Allapota
        {
            get
            {
                return allapota;
            }
            set
            {
                if(value < 0 || value > 100)
                {
                    throw new Exception("Invalid állapot!");
                } else
                {
                    allapota = value;
                }
            }
        }

        private int evjarat;
        public int Evjarat
        {
            get
            {
                return evjarat;
            }
            set
            {
                if(value < 1950 || value > 2024)
                {
                    throw new Exception("Invalid évjárat!");
                } else
                {
                    evjarat = value;
                }
            }
        }

        private string tulajdonos;
        public string Tulajdonos
        {
            get
            {
                return tulajdonos;
            }
            set
            {
                if(!value.Contains(" "))
                {
                    throw new Exception("A névnek tartalmaznia kell szóköz karaktert!");
                } else
                {
                    tulajdonos = value;
                }
            }
        }

        public void Megvetel(double ar, string ujTulaj)
        {
            Tulajdonos = ujTulaj;
            VeteliAra = ar;
        }

        public void Javit()
        {
            Random random = new Random();
            Allapota = random.Next(Allapota, 100 + 1);
        }

        public Jargany(int kerekei_szama, string model, markaEnum marka, double ara, int allapota, int evjarat, string tulajdonos)
        {
            Kerekei_Szama = kerekei_szama;
            Model = model;
            Marka = marka;
            Ara = ara;
            Allapota = allapota;
            Evjarat = evjarat;
            Tulajdonos = tulajdonos;
        }

    }
    internal class Program
    {
        static void Main(string[] args)
        {
            Jargany jarmu1 = new Jargany(4, "Zafira", Jargany.markaEnum.Opel, 3400000, 85, 2012, "Berdó István");

            Console.WriteLine(jarmu1);  // Minden writelinehoz brakepointot raktam, úgy szépen látszik hogy változnak az adatok

            jarmu1.Javit();

            Console.WriteLine(jarmu1);

            jarmu1.Megvetel(2900000, "Üdvöz Pál");

            Console.WriteLine(jarmu1);

            Console.ReadLine();
        }
    }
}

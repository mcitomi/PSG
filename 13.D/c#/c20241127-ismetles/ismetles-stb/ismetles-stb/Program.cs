using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ismetles_stb
{
    public class Ember
    {
        private int _eletkora;
        public int Eletkora { 
            get
            {
                return _eletkora;
            } 
            private set
            {
                // value -> beérkező adat (= jel után)

                if (!(value > _eletkora + 1))
                {
                    _eletkora = value;
                }
                else
                {
                    throw new ArgumentException("Nem megengedett életkor!");
                }
            }
        }

        private string _nev;
        public string Nev { 
            get
            {
                if(Eletkora < 18)
                {
                    return $"Kiskorú: {_nev}";
                } else
                {
                    return $"Nagykorú: {_nev}\t{Foglalkozas}";
                }
            }
            set
            {
                if (value.Contains(' '))
                {
                    _nev = value;
                } else
                {
                    throw new ArgumentException("A névnek tartalmaznia kell egy space karaktert!");
                }
            }
        }
        public string Foglalkozas { get; set; }

        public Ember(string nev)    // konstruktor
        {
            Eletkora = 0;
            Nev = nev;
            Foglalkozas = "Nincs";

        }

        public void EletkorBeallit(int eletkor)
        {
            Eletkora = eletkor;
        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            Ember ember = new Ember("Schrei Boti");
            Console.WriteLine(ember.Eletkora);

            ember.EletkorBeallit(1);
            ember.Nev = "Schrei Boti";

            Console.WriteLine(ember.Eletkora);
            Console.ReadLine();
        }
    }
}

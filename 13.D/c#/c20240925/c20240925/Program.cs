using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace c20240925
{
    public class Ember
    {
        private string haramdik_nev = null;
        private bool arvaE;
        private string szemelyiszam = null;

        private bool gyerekE;

        bool GyerekE() => gyerekE;

        public void FelnotteValik()
        {
            if(eletkor >= 18.0)
            {
                gyerekE = false;
            }
        }

        

        private float eletkor;
        public float Eletkor
        {
            get
            {
                return eletkor;
            }
            set
            {
                if (value < 100 && value > 0)
                {
                    eletkor = value;
                }
                else
                {
                    throw new Exception("Az értéknek 0 és 100 közé kell esnie");
                }
            }
        }

        private string vezeteknev;

        public string VezetekNev
        {
            get
            {
                return vezeteknev;
            }
            set
            {
                if(value.Length <= 9 && string.IsNullOrEmpty(value))
                {
                    vezeteknev = value;
                } else if(!string.IsNullOrEmpty(value))
                {
                    throw new Exception("A név nem lehet null vagy üres érték");
                } else
                {
                    vezeteknev = value.Substring(0,9);
                }
            }
        }
        private string csaladnev;
        public string CsaladNev
        {
            get
            {
                return csaladnev;
            } 
            set
            {
                if(value.Length <= 10 && string.IsNullOrEmpty(value))
                {
                    csaladnev = value;
                } else if(!string.IsNullOrEmpty(value))
                {
                    throw new Exception("A csaladnev nem lehet üres");
                } else
                {
                    csaladnev= value.Substring(0,10);
                }
            }
        }
        

        private string[] szulok;
        public string[] Szulok
        {
            get
            {
                return szulok;
            }
            set
            {
                if (arvaE)
                {
                    szulok = null;
                    return;
                }
                if (value[0].Length <= 19 && value[1].Length <= 19)
                {
                    szulok = new string[2] {
                        value[0],
                        value[1]
                    };
                } else
                {
                    szulok = new string[2] { 
                        value[0].Substring(19), 
                        value[1].Substring(19) 
                    };
                }
            }
        }

        private EgeszsegiAllapot egeszseg;
        public EgeszsegiAllapot Egeszseg
        {
            get
            {
                return egeszseg;
            }
            set
            {
                egeszseg = value;
            }
        }

        private Ember() { }
        public Ember(float eletkor, string veztekNev, string keresztNev, bool arvaE, EgeszsegiAllapot egeszseg, string[] szulok = null)
        {
            this.eletkor = eletkor;
            this.vezeteknev = veztekNev;
            this.csaladnev = keresztNev;
            if(arvaE && szulok != null && szulok.Length == 2) 
            {
                this.szulok = szulok;
            } else {
                throw new Exception("A szülők nem lehet null ha nem árva a gyerek");
            }
            gyerekE = eletkor < 18.0;

            if(eletkor < 15.0 && egeszseg != EgeszsegiAllapot.Tokeletes)
            {
                Console.WriteLine("msg");
            } else if( eletkor < 18.0 && egeszseg != EgeszsegiAllapot.Jo)
            {
                Console.WriteLine("msg");
            } else if( eletkor < 30.0 && egeszseg != EgeszsegiAllapot.Atlagos)
            {
                Console.WriteLine("msg");
            }

            this.egeszseg = egeszseg;
            szemelyiszam = null;

        }
        
        
    }
    public enum EgeszsegiAllapot
    {
        Rossz,
        Beteges,
        Atlagos,
        Jo,
        Tokeletes
    }
    internal class Program
    {
        static void Main(string[] args)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Text;
using System.Threading.Tasks;

namespace _20250122_grafikus_dani
{
    internal class TanulokClass
    {
        internal string Nev { get; set; }
        internal int Kor { get; set; }
        internal int Osztaly { get; set; }
        internal double Atlaga { get; set; }
        internal string Neme { get; set; }

        internal TanulokClass(string nev, int kor, int osztaly, double atalga, string neme) {
            Nev = nev; Kor = kor; Atlaga = atalga; Neme = neme; Osztaly = osztaly;
        }

    }
}

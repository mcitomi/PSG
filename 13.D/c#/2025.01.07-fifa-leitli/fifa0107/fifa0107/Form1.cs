using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;

namespace fifa0107
{
    public struct fifa
    {
        public string csapat;
        public int helyezes;
        public int valtozas;
        public float pontszam;
    }
    
    public struct statisztika
    {
        public int helyValtozas;
        public int csapatokSzama;
    }

    public partial class Form1 : Form
    {
        public List<fifa> fifaList = new List<fifa>();
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader("../fifa.txt");

            reader.ReadLine();  // fejléc soron átlépünk

            while (!reader.EndOfStream)
            {
                string line = reader.ReadLine();

                string[] values = line.Split(';');

                fifa fifaValues = new fifa();
                fifaValues.csapat = values[0];
                fifaValues.helyezes = Convert.ToInt32(values[1]);
                fifaValues.valtozas = Convert.ToInt32(values[2]);
                fifaValues.pontszam = Convert.ToInt32(values[3]);

                fifaList.Add(fifaValues);

                listBox1.Items.Add(values[0]);
                listBox2.Items.Add(values[1]);
                listBox3.Items.Add(values[2]);
                listBox4.Items.Add(values[3]);
            }

            MessageBox.Show($"A forrásállományban {fifaList.Count} csapat szerepel!");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if(fifaList.Count == 0)
            {
                MessageBox.Show("Hiba: Az adatok nincsenek beolvasva!");
                return;
            }

            float pontszamok = 0;
            foreach (fifa csapat in fifaList)
            {
                pontszamok += csapat.pontszam;
            }

            float atlaguk = pontszamok / fifaList.Count;

            MessageBox.Show($"A csapatok átlagos pontszáma: {atlaguk.ToString()} pont");
        }

        private void button3_Click(object sender, EventArgs e)
        {
            int valtozas = -10;
            fifa csapat = new fifa();
            foreach (fifa legtobbetJavitoCsapat in fifaList)
            {
                if(legtobbetJavitoCsapat.valtozas > valtozas)
                {
                    csapat = legtobbetJavitoCsapat;
                    valtozas = legtobbetJavitoCsapat.valtozas;
                    Console.WriteLine(csapat.csapat);
                }
            }

            MessageBox.Show($"A legtöbbet javító csapat {csapat.csapat} \n - Helyezés: {csapat.helyezes}\n - Pontszám: {csapat.pontszam}");
        }

        private void button4_Click(object sender, EventArgs e)
        {
            bool talalhatoMagyarCsapat = false;
            foreach (fifa csapat in fifaList)
            {
                if(csapat.csapat.ToLower() == "magyarország")
                {
                    talalhatoMagyarCsapat = true;
                }
            }

            if(talalhatoMagyarCsapat)
            {
                MessageBox.Show("Található magyar csapat a listán");
            } else
            {
                MessageBox.Show("Nem található magyar csapat a listán");
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            List<statisztika> stats = new List<statisztika>();

            foreach (fifa csapat in fifaList)
            {
                statisztika statsValue = stats.Find(x => x.helyValtozas == csapat.valtozas);

                Console.WriteLine(csapat.valtozas);

                if(statsValue.csapatokSzama == 0)
                {
                    Console.WriteLine("fut");
                    statisztika adatok = new statisztika();
                    adatok.helyValtozas = csapat.valtozas;
                    adatok.csapatokSzama = 1;
                    stats.Add(adatok);
                } else
                {
                    stats.Remove(statsValue);
                    statsValue.csapatokSzama++;
                    stats.Add(statsValue);
                }
            }

            string statisztikaGui = "";
            foreach (var item in stats)
            {
                Console.WriteLine($"{item.csapatokSzama} {item.helyValtozas}");

                if(item.csapatokSzama > 1)
                {
                    statisztikaGui += $"{item.helyValtozas} helyet változott: {item.csapatokSzama} csapat\n";
                }
            }

            MessageBox.Show(statisztikaGui);
        }
    }
}

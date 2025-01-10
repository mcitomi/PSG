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

namespace Snooker_0110
{
    public partial class Form1 : Form
    {
        public struct snooker
        {
            public int helyezes;
            public string nev;
            public string orszag;
            public int nyeremeny;
        }
        public Form1()
        {
            InitializeComponent();
        }
        List<snooker> list = new List<snooker>();
        private void button1_Click(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader("../../snooker.txt");

            reader.ReadLine(); // fejléc sor skip

            while (reader.Peek() >= 0) 
            {
                string line = reader.ReadLine();

                listBox1.Items.Add(line);

                string[] lineValues = line.Split(';');

                snooker versenyzo = new snooker();
                versenyzo.helyezes = int.Parse(lineValues[0]);
                versenyzo.nev = lineValues[1];
                versenyzo.orszag = lineValues[2];
                versenyzo.nyeremeny = int.Parse(lineValues[3]);
                
                list.Add(versenyzo);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show($"A világranglistán {list.Count} versenyző szerepel");
        }

        private void button3_Click(object sender, EventArgs e)
        {
            double sum = 0;
            foreach (snooker versenyzo in list)
            {
                sum += versenyzo.nyeremeny;
            }
            
            MessageBox.Show($"A versenyzők átlagosan {Math.Round(sum / list.Count, 2):0.00} forintot kerestek");
        }

        private void button4_Click(object sender, EventArgs e)
        {
            int legnagyobbKereset = 0;
            snooker keresettversenyzo = new snooker();

            foreach (snooker versenyzo in list)
            {
                if(versenyzo.nyeremeny > legnagyobbKereset && versenyzo.orszag == "Kína")
                {
                    keresettversenyzo = versenyzo;
                    legnagyobbKereset = versenyzo.nyeremeny;
                }   
            }

            MessageBox.Show($"A legjobban kereső kínai versenyző:\n\tHelyezés: {keresettversenyzo.helyezes}\n\tNév: {keresettversenyzo.nev}\n\tOrszág: {keresettversenyzo.orszag}\n\tNyeremény összege: {(keresettversenyzo.nyeremeny * 380):0 000 000} Ft");
        }

        private void button5_Click(object sender, EventArgs e)
        {
            bool isFound = false;
            foreach (snooker versenyzo in list)
            {
                if(versenyzo.orszag == "Norvégia")
                {
                    isFound = true;
                }
            }

            if (isFound)
            {
                MessageBox.Show("A versenyzők között van norvég versenyző");
            } else
            {
                MessageBox.Show("A versenyzők között nincs norvég versenyző");
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            Dictionary<string, int> stats = new Dictionary<string, int>();

            foreach (snooker versenyzo in list)
            {
                if (stats.ContainsKey(versenyzo.orszag))
                {
                    stats[versenyzo.orszag]++;
                } else
                {
                    stats.Add(versenyzo.orszag, 1);
                }
            }

            StringBuilder statsString = new StringBuilder();
            statsString.Append("Statisztika:\n");

            foreach (var orszagstat in stats)
            {
                if(orszagstat.Value > 4)
                {
                    statsString.AppendLine($"\t{orszagstat.Key} - {orszagstat.Value} fő");
                }
            }

            MessageBox.Show(statsString.ToString());
        }
    }
}

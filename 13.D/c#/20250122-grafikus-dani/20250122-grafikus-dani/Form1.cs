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

namespace _20250122_grafikus_dani
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        List<TanulokClass> tanulokListaja = new List<TanulokClass>();
        private void Form1_Load(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader("../../_0122.txt");

            while (reader.Peek() >= 1) 
            {
                string[] line = reader.ReadLine().Split(';');
                tanulokListaja.Add(new TanulokClass(line[0], Convert.ToInt32(line[1]), Convert.ToInt16(line[2]), Convert.ToDouble(line[3]), line[4]));
            }

            foreach (TanulokClass tanulo in tanulokListaja)
            {
                listBox1.Items.Add($"{tanulo.Nev} {tanulo.Kor} {tanulo.Osztaly} {tanulo.Atlaga} {tanulo.Neme}");
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show($"A lista {tanulokListaja.Count} elemű");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            listBox1.Items.Clear();
            listBox1.Items.Add("Tanulók 3.0 feletti átlaggal:");
            foreach (TanulokClass tanulo in tanulokListaja)
            {
                if(tanulo.Atlaga > 3.0)
                {
                    listBox1.Items.Add($"{tanulo.Nev}, Átalga: {tanulo.Atlaga}");
                }
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Dictionary<int, List<double>> osztalyok = new Dictionary<int, List<double>>();

            foreach (TanulokClass tanulo in tanulokListaja)
            {
                if(osztalyok.ContainsKey(tanulo.Osztaly))
                {
                    osztalyok[tanulo.Osztaly].Add(tanulo.Atlaga);
                } else
                {
                    osztalyok.Add(tanulo.Osztaly, new List<double> { tanulo.Atlaga });
                }
            }

            StringBuilder stringBuilder = new StringBuilder();
            foreach (var osztaly in osztalyok)
            {
                stringBuilder.AppendLine($"{osztaly.Key}, Átlaga: {osztaly.Value.Average():0.00}");
            }

            MessageBox.Show(stringBuilder.ToString());
        }

        private void button4_Click(object sender, EventArgs e)
        {
            StreamWriter writer = new StreamWriter("../../13osztaly.txt");
            foreach (TanulokClass tanulo  in tanulokListaja)
            {
                if(tanulo.Osztaly == 13)
                {
                    writer.WriteLine($"{tanulo.Nev};{tanulo.Kor};{tanulo.Osztaly};{tanulo.Atlaga};{tanulo.Neme}");
                }
            }

            writer.Close();
            MessageBox.Show("Fájl sikeresen mentve");
        }
    }
}

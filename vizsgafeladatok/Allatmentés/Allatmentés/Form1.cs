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

namespace Allatmentés
{
    public partial class Form1 : Form
    {
        public List<Allat> allatokListaja = new List<Allat>();
        public Form1()
        {
            InitializeComponent();
        }

        public Allat KeresettNev(string KeresettNev)
        {
            return allatokListaja.Find(x => x.Nev == KeresettNev);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string Neve = textBox1.Text;
            int Kor = Convert.ToInt32(textBox2.Text);
            string Neme = radioButton1.Checked ? "Nőstény": (radioButton2.Checked ? "Hím" : "N/A");

            textBox1.Text = textBox2.Text = "";
            radioButton1.Checked = radioButton2.Checked = false;

            allatokListaja.Add(new Allat(Neve, Neme, Kor));

            richTextBox1.AppendText($"{Neve}, {Kor} éves, {Neme}\n");

            // Allat mici = KeresettNev("Mici");

        }

        private void button2_Click(object sender, EventArgs e)
        {
            StreamWriter writer = new StreamWriter("exported.csv");

            foreach (Allat allat in allatokListaja)
            {
                writer.WriteLine($"{allat.Nev};{allat.Kora};{allat.Neme}");
            }

            writer.Close();

            MessageBox.Show("File successfully exported!");
        }
    }
    public class Allat
    {
        public Allat(string nev, string neme, int kora)
        {
            Nev = nev;
            Neme = neme;
            Kora = kora;
        }

        public string Nev {  get; set; }
        public string Neme { get; set; }
        public int Kora { get; set; }
        
    }
}

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

namespace _410es
{
    public partial class Form1 : Form
    {
        public List<Allomasok> allomasokListaja = new List<Allomasok>();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            StreamReader sr = new StreamReader("../../V410.csv");

            sr.ReadLine();

            while (!sr.EndOfStream)
            {
                string[] line = sr.ReadLine().Split(';');

                allomasokListaja.Add(new Allomasok(line[0], Convert.ToInt32(line[1]), Convert.ToInt32(line[2])));

                comboboxHonnan.Items.Add(line[0]);
                comboboxHova.Items.Add(line[0]);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            Allomasok induloPont = allomasokListaja.Find(all => all.Megallo.Trim() == comboboxHonnan.SelectedItem.ToString());
            Allomasok erkezesiPont = allomasokListaja.Find(all => all.Megallo.Trim() == comboboxHova.SelectedItem.ToString());

            int megallokSzama = Math.Abs(induloPont.Hatvantol - erkezesiPont.Hatvantol);

            label3.Text = $"Az utazás várható időtartama: {megallokSzama} megálló";
        }
    }

    public class Allomasok
    {
        public string Megallo { get; set; }
        public int Hatvantol { get; set; }
        public int Stadiontol { get; set; }
        public Allomasok(string megallo, int hatvantol, int stadiontol)
        {
            this.Megallo = megallo;
            this.Hatvantol = hatvantol;
            this.Stadiontol = stadiontol;
        }
    }
}

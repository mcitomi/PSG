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

namespace hegyek_menupontok_leitli
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public List<Hegyek> list = new List<Hegyek>();

        public double feet = 3.280839895;

        private void feladatToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader("../../hegyekMo.txt");

            reader.ReadLine();

            while (reader.Peek() > -1)
            {
                string[] line = reader.ReadLine().Split(';');

                list.Add(new Hegyek{ HegyNev = line[0], Hegyseg = line[1], Magassag = Convert.ToInt32(line[2]) });
            }
            reader.Close();
            MessageBox.Show("File beolvasva!");
        }

        private void feladatSzámolásToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show($"3. feladat: Hegycsúcsok száma: {list.Count} db");
        }

        private void feladatÁtlagToolStripMenuItem_Click(object sender, EventArgs e)
        {
            int hegyekMagassaga = list[0].Magassag;
            
            for (int i = 1; i < list.Count; i++)
            {
                hegyekMagassaga += list[i].Magassag;
            }

            MessageBox.Show($"4. feladat: Hegycsúcsok átlagos magassága: {((double)hegyekMagassaga / (double)list.Count):0.00} m");
        }

        private void feladatLegmagasabbToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Hegyek legmagasabbHegy = list[0];

            for (int i = 1; i < list.Count; i++)
            {
                if(legmagasabbHegy.Magassag < list[i].Magassag)
                {
                    legmagasabbHegy = list[i];
                }
            }

            MessageBox.Show($"5. feladat: A legmagasabb hegycsúcs adatai:\n\tNév: {legmagasabbHegy.HegyNev}\n\tHegység: {legmagasabbHegy.Hegyseg}\n\tMagasság: {legmagasabbHegy.Magassag} m");
        }

        private void feladatBörzsönyToolStripMenuItem_Click(object sender, EventArgs e)
        {
            BorzsonyForm form = new BorzsonyForm();
            
            if(form.ShowDialog(this) == DialogResult.OK)
            {
                int tesztMagassag = Convert.ToInt32(form.textBox1.Text);

                bool vanMagasabbHegy = false;
                int i = 0;

                while (!vanMagasabbHegy && i < list.Count)
                {
                    Hegyek hegy = list[i];

                    if (hegy.Hegyseg == "Börzsöny" && hegy.Magassag > tesztMagassag)
                    {
                        vanMagasabbHegy = true;
                    }

                    i++;
                }

                if(vanMagasabbHegy)
                {
                    MessageBox.Show($"Van {tesztMagassag}m-nél magasabb hegycsúcs a Börzsönyben!");
                } else
                {
                    MessageBox.Show($"Nincs {tesztMagassag}m-nél magasabb hegycsúcs a Börzsönyben!");
                }
            }

            form.Dispose();
        }

        private void kilépésToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void feladat3000LábToolStripMenuItem_Click(object sender, EventArgs e)
        {
            int talaltCsucsok = 0;

            foreach (Hegyek hegy in list)
            {
                if(hegy.Magassag * feet > 3000)
                {
                    talaltCsucsok++;
                }
            }

            MessageBox.Show($"7. feladat: 3000 lábnál magasabb hegycsúcsok száma: {talaltCsucsok}");
        }

        private void feladatStatisztikaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Dictionary<string, int> statisztika = new Dictionary<string, int>();

            foreach (Hegyek hegy in list)
            {
                if(!statisztika.ContainsKey(hegy.Hegyseg))
                {
                    statisztika.Add(hegy.Hegyseg, 1);
                } else
                {
                    statisztika[hegy.Hegyseg]++;
                }
            }

            StringBuilder statisztikaString = new StringBuilder();

            statisztikaString.AppendLine("8. feladat: Hegység statisztika");

            foreach (var hegyseg in statisztika)
            {
                statisztikaString.AppendLine($"\t {hegyseg.Key} - {hegyseg.Value} db");
            }

            MessageBox.Show(statisztikaString.ToString());
        }

        private void feladatBukkvidektxtToolStripMenuItem_Click(object sender, EventArgs e)
        {
            StreamWriter writer = new StreamWriter("../../bukk-videk.txt");

            writer.WriteLine("Hegycsúcs neve;Magasság láb");

            foreach (Hegyek hegy in list)
            {
                if(hegy.Hegyseg == "Bükk-vidék")
                {
                    writer.WriteLine($"{hegy.HegyNev};{((double)hegy.Magassag*feet):0.#}");
                }
            }
            writer.Close();
            MessageBox.Show("9. feladat: bukk-videk.txt");
        }
    }

    public class Hegyek
    {
        public string HegyNev { get; set; }
        public string Hegyseg { get; set; }
        public int Magassag { get; set; }

        public Hegyek() { }
    }
}
// Berdó Tamás 2025-03-06
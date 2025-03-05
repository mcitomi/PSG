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

        private void feladatToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader("../../hegyekMo.txt");

            reader.ReadLine();

            while (reader.Peek() > -1)
            {
                string[] line = reader.ReadLine().Split(';');

                list.Add(new Hegyek{ HegyNev = line[0], Hegyseg = line[1], Magassag = Convert.ToInt32(line[2]) });
            }
        }

        private void feladatSzámolásToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show($"{list.Count}");
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

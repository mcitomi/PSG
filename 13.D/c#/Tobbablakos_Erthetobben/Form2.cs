using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tobbablakos_Erthetobben
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void button_vissza_Click(object sender, EventArgs e)
        {
            Vissza(); // Meghívjuk a "Vissza" nevű függvényt
        }

        public void Vissza()
        {
            this.Close();  // Az aktuális Form-ot bezárjuk
            Form1.ElsoOldal.Show(); // Az "ElsoOldal" nevű Form1 példányt pedig vissza nyitjuk
        }

    }
}

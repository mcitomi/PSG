using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _20250212_karacsonyGUI
{
    public partial class Form1 : Form
    {
        public static int keszlet = 0;
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            textBoxEladott.Text = "0";
            textBoxElkeszitett.Text = "0";

            for (int i = 1; i <= 40; i++)
            {
                comboBox.Items.Add($"{i}");
            }

            warningLabel.ForeColor = Color.Red;
            
        }

        private void buttonHozzaad_Click(object sender, EventArgs e)
        {
            if(Convert.ToInt32(textBoxEladott.Text) < 0 || Convert.ToInt32(textBoxElkeszitett.Text) < 0)
            {
                warningLabel.Text = "Negatív számot nem adhat meg!";
                return;
            }

            if(Convert.ToInt32(textBoxEladott.Text) > (keszlet + Convert.ToInt32(textBoxElkeszitett.Text)) )
            {
                warningLabel.Text = "Túl sok az eladott angyalka!";
                return;
            }

            keszlet = (Convert.ToInt32(textBoxElkeszitett.Text) + keszlet) - Convert.ToInt32(textBoxEladott.Text);

            listBox.Items.Add($"{comboBox.SelectedItem}.nap:\t+{textBoxElkeszitett.Text}\t-{textBoxEladott.Text}\t=\t{keszlet}");

            textBoxElkeszitett.Text = textBoxEladott.Text = "0";

            int selceted = Convert.ToInt32(comboBox.SelectedItem);
            for (int i = 0; i < selceted; i++)
            {
                comboBox.Items.RemoveAt(0);
            }
        }
    }
}

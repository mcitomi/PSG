using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2025._02._05_formok
{
    public partial class Register : Form
    {
        public Register()
        {
            InitializeComponent();
        }

        private void btnReg_Click(object sender, EventArgs e)
        {
            // Adatbázis hívás írás

            if(!string.IsNullOrEmpty(txtUser.Text) && !string.IsNullOrEmpty(txtPass.Text)) {
                if(Adatbazis.Register(txtUser.Text, txtPass.Text))
                {

                }
            }
        }

        private void btnBack_Click(object sender, EventArgs e)
        {
            Login loginPage = new Login();
            loginPage.Show();
            this.Hide();
        }
    }
}

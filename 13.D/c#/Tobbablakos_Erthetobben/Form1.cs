namespace Tobbablakos_Erthetobben
{
    public partial class Form1 : Form
    {

        public static Form1 ElsoOldal = new Form1();
        // L�trehozzunk egy �j p�ld�nyt a Form1 oszt�lyb�l


        public Form1()
        {
            InitializeComponent();
        }

        private void button_oda_Click(object sender, EventArgs e)
        // Ha a gombra kattintanak, akkor:
        {
            Oda();  // Megh�vjuk az "Oda" nev� f�ggv�nyt
        }

        private void Oda()
        {
            this.Hide();
            // Elt�ntetjuk az aktu�lis lapot, de nem z�rjuk be! 

            Form2 MasikOldal = new Form2();
            // L�trehozunk egy �j Form2 p�ld�nyt

            MasikOldal.Show();
            // El�hozzuk a "MasikOldal" nev� lapot
        }
    }
}

namespace Tobbablakos_Erthetobben
{
    public partial class Form1 : Form
    {

        public static Form1 ElsoOldal = new Form1();
        // Létrehozzunk egy új példányt a Form1 osztályból


        public Form1()
        {
            InitializeComponent();
        }

        private void button_oda_Click(object sender, EventArgs e)
        // Ha a gombra kattintanak, akkor:
        {
            Oda();  // Meghívjuk az "Oda" nevû függvényt
        }

        private void Oda()
        {
            this.Hide();
            // Eltûntetjuk az aktuális lapot, de nem zárjuk be! 

            Form2 MasikOldal = new Form2();
            // Létrehozunk egy új Form2 példányt

            MasikOldal.Show();
            // Elõhozzuk a "MasikOldal" nevû lapot
        }
    }
}

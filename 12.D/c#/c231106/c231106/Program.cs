using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

namespace Füleki_József_12D_2023._10._24.Házi_Feladat
{
    /*
        Füleki József 12D 2023. 10. 24. Házi Feladat
    */
    [Serializable]
    class Counter_terrorist
    {
        #region
        public string Nev { get; set; }
        public int Eletero { get; set; }
        public int Sebzes { get; set; }
        public int Fejlesztes { get; set; }

        public Counter_terrorist(string nev, int eletero, int sebzes, int fejlesztes)
        {
            #region
            Nev = nev;
            Eletero = eletero;
            Sebzes = sebzes;
            Fejlesztes = fejlesztes;
            #endregion
        }
        //Döntések
        #region
        public void Status()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} életereje {Eletero} és ennyit sebez {Sebzes}. Fejlesztési lehetőség {Fejlesztes}.");
            Console.ResetColor();
            #endregion
        }
        public void Fight()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} eltalált egy terroristát, aki meghalt.");
            Console.ResetColor();
            #endregion
        }
        public void Menedek()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} elbújt, így regenerálódott.");
            Console.ResetColor();
            int eletero_alap = Eletero;
            int eletero_maradek = eletero_alap - Eletero;
            Eletero += eletero_maradek;
            #endregion
        }
        public void Toltes()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} feltöltötte a fegyverét tölténnyel.");
            Console.ResetColor();
            #endregion
        }
        public void Kes()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} megkéselt egy terroristát.");
            Console.ResetColor();
            #endregion
        }
        public void Upgrade()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"{Nev} fejleszteni próbálja a sebzését.");
            Console.ResetColor();
            if (Fejlesztes != 0)
            {
                Fejlesztes -= 10;
                Sebzes += 10;
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("A fejlesztés sikeres volt!");
                Console.ResetColor();
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("A fejlesztés sikertelen volt!");
                Console.ResetColor();
            }
            #endregion
        }
        #endregion

        //Sérülések
        #region
        public void Lab_serules(int sebzes)
        {
            #region
            Eletero -= sebzes;
            #endregion
        }
        public void Kar_serules(int sebzes)
        {
            #region
            Eletero -= sebzes;
            #endregion
        }
        public void Fej_serules()
        {
            #region
            Eletero -= 20;
            #endregion
        }
        public void Serules()
        {
            #region
            Eletero -= Eletero;
            #endregion
        }
        #endregion

        public void Mentes()
        {
            #region
            try
            {
                using (FileStream stream = new FileStream("savegame.dat", FileMode.Create))
                {
                    IFormatter formatter = new BinaryFormatter();
                    formatter.Serialize(stream, this);
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("A játék elmentve!");
                    Console.ResetColor();
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Hiba történt a mentés közben" + ex.Message);
                Console.ResetColor();
            }
            #endregion
        }

        public static Counter_terrorist Betoltes()
        {
            #region
            if (File.Exists("savegame.dat"))
            {
                try
                {
                    using (FileStream stream = new FileStream("savegame.dat", FileMode.Open))
                    {
                        IFormatter formatter = new BinaryFormatter();
                        Counter_terrorist betoltes = (Counter_terrorist)formatter.Deserialize(stream);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("A játék betöltött!");
                        Console.ResetColor();
                        return betoltes;
                    }
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Hiba a betöltés során!" + ex.Message);
                    Console.ResetColor();
                }
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("Nincsen mentett állás!");
                Console.ResetColor();
            }
            return null;
            #endregion
        }
        #endregion
    }
    class Terrorist
    {
        #region
        public string Terrorist_Nev { get; set; }
        public int Terrorist_Sebzes { get; set; }
        public Terrorist(string nev, int sebzes)
        {
            #region
            Terrorist_Nev = nev;
            Terrorist_Sebzes = sebzes;
            #endregion
        }
        public void Lepes(Counter_terrorist ellenfel)
        {
            //Random terrorista
            #region
            Random veletlen = new Random();
            int lepes = veletlen.Next(1, 10);

            switch (lepes)
            {
                #region
                case 1:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"Egy {Terrorist_Nev} lábon sebzett.");
                    Console.ResetColor();
                    ellenfel.Lab_serules(Terrorist_Sebzes);
                    break;
                case 2:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"A {Terrorist_Nev} nem talált el.");
                    Console.ResetColor();
                    break;
                case 3:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"A {Terrorist_Nev} karon sebzett.");
                    Console.ResetColor();
                    ellenfel.Kar_serules(Terrorist_Sebzes);
                    break;
                case 4:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"Egy {Terrorist_Nev} fejen sebzett.");
                    Console.ResetColor();
                    ellenfel.Fej_serules();
                    break;
                case 5:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"A {Terrorist_Nev} mellkason sebzett.");
                    Console.ResetColor();
                    ellenfel.Serules();
                    break;
                case 6:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"A {Terrorist_Nev} nem talál téged.");
                    Console.ResetColor();
                    break;
                case 7:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"A {Terrorist_Nev} nem látott meg.");
                    Console.ResetColor();
                    break;
                case 8:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"Egy {Terrorist_Nev} öngyilkos lett.");
                    Console.ResetColor();
                    break;
                case 9:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"Egy {Terrorist_Nev} felrobbantott téged.");
                    Console.ResetColor();
                    ellenfel.Serules();
                    break;
                    #endregion
            }
            #endregion
        }
        #endregion
    }
    class Fegyver
    {
        #region
        public int Pisztoly { get; set; }
        public Fegyver(int pisztoly)
        {
            #region
            Pisztoly = pisztoly;
            #endregion
        }

        public void Fegyver_toltes()
        {
            #region
            int alap = 10;
            int maradek = alap - Pisztoly;
            Pisztoly += maradek;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Sikeres feltöltés! {Pisztoly} töltényed van.");
            Console.ResetColor();
            #endregion
        }
        public void Fegyver_loves()
        {
            #region
            Pisztoly -= 1;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Még {Pisztoly} töltényed maradt.");
            Console.ResetColor();
            if (Pisztoly == 0)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Elfogyott a lőszered, tölteni kell!");
                Console.ResetColor();
            }
            #endregion
        }
        #endregion
    }
    internal class Program
    {
        #region
        static void Diszit_elso()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Blue;
            for (int i = 0; i < 20; i++)
            {
                Console.Write("+ - ");
            }
            Console.ResetColor();
            #endregion
        }
        static void Diszit_masodik()
        {
            #region
            Console.ForegroundColor = ConsoleColor.Blue;
            for (int i = 0; i < 20; i++)
            {
                Console.Write("x + ");
            }
            Console.ResetColor();
            #endregion
        }
        static void Main(string[] args)
        {
            #region
            //Készítő
            #region
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Házi Feladat 2023. 10. 24. - Füleki József 12.D");
            Console.ResetColor();
            #endregion

            //Játék neve
            #region
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Counter Strike");
            Console.ResetColor();
            #endregion

            //Játék tudásom
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("\n(Nem ismerem ezt a játékot, de igyekeztem élvezhető játékot készíteni!)\n");
            Console.ResetColor();
            #endregion

            Counter_terrorist jatekos = null;

            while (true)
            {
                #region
                Diszit_elso();
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("\nMenü:");
                Console.ResetColor();
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("1. Új játék\n2. Betöltés\n3. Kilépés");
                Console.ResetColor();
                Diszit_elso();

                Console.ForegroundColor = ConsoleColor.Magenta;
                Console.Write("\nKérem a választásod: ");
                Console.ResetColor();
                int valasztas = Convert.ToInt32(Console.ReadLine());

                switch (valasztas)
                {
                    #region
                    case 1:
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.Write("\nKérem a nevedet: ");
                        Console.ResetColor();
                        string jatekosNev = Console.ReadLine();
                        jatekos = new Counter_terrorist(jatekosNev, 100, 10, 90);
                        Game(jatekos);
                        break;
                    case 2:
                        jatekos = Counter_terrorist.Betoltes();
                        if (jatekos != null)
                        {
                            Game(jatekos);
                        }
                        break;
                    case 3:
                        Environment.Exit(0);
                        break;
                    default:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("Érvénytelen választás!");
                        Console.ResetColor();
                        break;
                        #endregion
                }
                #endregion
            }
            #endregion
        }
        static void Game(Counter_terrorist jatekos)
        {
            #region
            //Választék
            #region
            Diszit_elso();
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("\n8 opció közül választhatsz:");
            Console.ResetColor();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("1. Státusz\n2. Lövés\n3. Elbújás\n4. Fegyver töltés\n5. Késelés\n6. Fejlesztés\n7. Mentés\n8. Kilépés");
            Console.ResetColor();
            Diszit_elso();
            #endregion

            //Jó kívánság
            #region
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("\nJó játékot kívánok és sok sikert!");
            Console.ResetColor();
            #endregion

            string terrorist = "terrorista";
            Terrorist ter_ellenfel = new Terrorist(terrorist, 10);

            Fegyver tolteny = new Fegyver(10);

            while (jatekos.Eletero != 0)
            {
                #region
                Console.ForegroundColor = ConsoleColor.Magenta;
                Console.Write("\nVálassz egy lépést: ");
                Console.ResetColor();
                int megelozo_elharitas = Convert.ToInt32(Console.ReadLine());

                //Döntések
                switch (megelozo_elharitas)
                {
                    #region
                    case 1:
                        jatekos.Status();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 2:
                        jatekos.Fight();
                        tolteny.Fegyver_loves();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 3:
                        jatekos.Menedek();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 4:
                        jatekos.Toltes();
                        tolteny.Fegyver_toltes();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 5:
                        jatekos.Kes();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 6:
                        jatekos.Upgrade();
                        ter_ellenfel.Lepes(jatekos);
                        Diszit_masodik();
                        break;
                    case 7:
                        jatekos.Mentes();
                        Diszit_masodik();
                        break;
                    case 8:
                        Environment.Exit(0);
                        break;
                    default:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("Érvénytelen választás!");
                        Console.ResetColor();
                        Diszit_masodik();
                        break;
                        #endregion
                }
                #endregion
            }

            //Vége
            #region
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\n\nA játék számodra véget ért!\n");
            #endregion

            Console.ResetColor();
            #endregion
        }
        #endregion
    }
    /*
        Kezdés: 2023. 10. 29. - 10:48
        Befejezés: 2023. 10. 29. - 15:11
    */
}
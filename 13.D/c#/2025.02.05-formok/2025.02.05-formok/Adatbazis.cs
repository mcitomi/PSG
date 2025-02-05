using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace _2025._02._05_formok
{
    public static class Adatbazis
    {
        private static string connString =
            "server=localhost ;uid=root; pwd=; database=";

        private static MySqlConnection conn = new MySqlConnection(connString);

        public static void Connect()
        {
            try
            {
                conn.Open();

            }
            catch (MySqlException e)
            {
                MessageBox.Show(e.ToString());
            }
            finally
            {
                conn.Close();
            }
        }

        public static bool Login(string username, string password)
        {
            string query =
                $"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'";

            MySqlCommand cmd = new MySqlCommand(query, conn);   // parancs változó létrehozása

            try
            {
                conn.Open();    // megpróbálja kinyitni a kapcsolatot
                MySqlDataReader reader = cmd.ExecuteReader();   // ez futtatja a fent elkészített parancsot

                return reader.Read();   // ha tud olvasni, igaz értéket ad, ha nem akkor hasmis
                // ha sikerült a lekérdezés tud olvasni, ha nem nem
            }
            catch (MySqlException e)
            {
                MessageBox.Show(e.ToString());  
                return false;
            } 
            finally
            {
                conn.Close();
            }
        }

        public static bool Register(string user, string pass)
        {
            try
            {
                // Ellenőrizzük hogy van e már ilyen user az adatbázisban
                string query =
                    $"SELECT * FROM users WHERE user='{user}'"; // lekérjük a db sorokat ahol van név
                MySqlCommand cmd = new MySqlCommand(query, conn);
                MySqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read()) {    // ha tudja olvasni thehát van sor akkor van már ilyen név
                    return false;   // szóval visszatérünk false-al, mert hogy hibás reg
                }

                // Adatok feltöltése
                query =
                    $"INSERT INTO users(user, password) VALUES ('{user}', '{pass}')";

                cmd = new MySqlCommand(query, conn);

                var lines = cmd.ExecuteNonQuery();

                return lines > 0;
            } 
            catch(MySqlException e)
            {
                MessageBox.Show(e.ToString());
                return false;
            }
            finally
            {
                conn.Close();
            }
        }
    }
}

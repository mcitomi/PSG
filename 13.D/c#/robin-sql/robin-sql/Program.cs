using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace robin_sql
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string connectionString = "Server=localhost;Database=laptops;User ID=root;Password=;";

            MySqlConnection connection = new MySqlConnection(connectionString);

            try
            {
                connection.Open();
                Console.WriteLine("Sikeres csatalkozás!");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Hiba csatlakozáskor: " + ex.ToString());
            }

            try
            {
                string insertQuery = "INSERT INTO laptopok (marka, processzor, ram, gyartasiEv) VALUES ('Lenoveo', 'Intel i5', 32, '2023-03-20');";
                MySqlCommand command = new MySqlCommand(insertQuery, connection);

                command.ExecuteNonQuery();

                Console.WriteLine("Sikeres adatfelvétel");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.ToString());
            }


            Console.ReadLine();
        }
    }
}

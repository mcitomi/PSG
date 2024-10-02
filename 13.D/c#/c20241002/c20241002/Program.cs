using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace c20241002
{
    public class Person
    {
        private static int _id = 0;
        private int id;
        // readonly, osztálybol irhato, letrehozaskor 1-el no

        private string name;
        // readonly, minimum 5 karakter hosszunak kelllennie

        private int age;
        // readonly, 0-100 között kell lennie

        private List<string> hobbies;
        // tuljadonsaga, iraskor inicalizalja ha még nincs
        //olvasható és írható is kivülről, viszont minden elem hossza 20 karakternel legyen hosszabb

        public Person(string name, int age, List<string> hobbies) {
           
            Id = id;

            Age = age;

            Name = name;

            Hobbies = hobbies;

        }

        public int Id
        {
            get => id;
            private set
            {
                _id++;
                id = _id;
            }
        }

        public string Name
        {
            get => name;
            private set
            {
                name = value;
            }
        }

        public int Age
        {
            get => age;
            set
            {
                if (value > 0 && value < 100)
                {
                    age = value;
                }
                else
                {
                    throw new Exception("A kornak 0 és 100 között kell lennie");
                }
            }
        }

        public List<string> Hobbies
        {
            get => hobbies;
            set
            {
                if (string.IsNullOrEmpty(value.Find(x => x.Length < 20)))
                {
                    hobbies = value;
                }
                else
                {
                    throw new Exception("Az egyik hobbi hossza rövidebb mint 20 karakter!");
                }
            }
        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            Person p1 = new Person("Vivike", 10, new List<string>() { "abcdefaeghjhgukaheguhaeukgueab", "ufahufwafawfuwafhuwafwuafuuwaf" });
            Person p2 = new Person("Balazs", 14, new List<string>() { "abcdefaeghjhgukaheguhaeukgueab", "ufahufwafawfuwafhuwafwuafuuwaf" });

            Console.WriteLine($"{p1.Name} {p1.Age} éves, azonositoja #{p1.Id}");
            Console.WriteLine($"{p2.Name} {p2.Age} éves, azonositoja #{p2.Id}");

            Console.ReadLine();
        }
    }
}

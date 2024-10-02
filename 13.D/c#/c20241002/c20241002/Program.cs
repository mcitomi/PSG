using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace c20241002
{
    public class Person
    {
        private static int id = 0;
        // readonly, osztálybol irhato, letrehozaskor 1-el no

        private string name;
        // readonly, minimum 5 karakter hosszunak kelllennie

        private int age;
        // readonly, 0-100 között kell lennie

        private List<string> hobbies;
        // tuljadonsaga, iraskor inicalizalja ha még nincs
        //olvasható és írható is kivülről, viszont minden elem hossza 20 karakternel legyen hosszabb

        public Person(string name, int age, List<string> hobbies) {
            id++;
           
            if(name.Length > 5)
            {
                this.name = name;
            } else
            {
                throw new Exception("A név nem lehet rövidebb mint 5 karakter!");
            }

            if(age > 0 && age < 100)
            {
                this.age = age;
            } else
            {
                throw new Exception("A kornak 0 és 100 között kell lennie");
            }

            if(!string.IsNullOrEmpty(hobbies.Find(x => x.Length < 20)))
            {
                this.hobbies = hobbies;
            } else
            {
                throw new Exception("Az egyik hobbi hossza rövidebb mint 20 karakter!");
            }
        }

        public int Id
        {
            get => id;
            private set
            {
                id++;
            }
        }

        public string Name
        {
            get => name;
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
                if (!string.IsNullOrEmpty(value.Find(x => x.Length < 20)))
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

        }
    }
}

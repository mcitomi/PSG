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
            get => hobbies; //ezt így nem szabad egybe visszaadni!!!! csak az elemeit
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

    public class Family // konténerosztály
    {
        private List<Person> persons = new List<Person>();

        public Person this[int id]  //indexer
        {
            get
            {
                if(0 <= id && id < persons.Count)
                {
                    return persons[id];
                } else
                {
                    throw new Exception("Nincs ilyen id");
                }
            }
        }

        public Person this[string name]
        {
            get
            {
                if (!string.IsNullOrEmpty(name))
                {
                    foreach(Person obj in persons)
                    {
                        if(obj.Name.ToLower() == name.ToLower().Trim())
                        {
                            return obj;
                        }
                    }
                    throw new Exception("Nincs ilyen ember ilyen nevvel");
                } else
                {
                    throw new Exception("Nev nem lehet üres");
                }
            }
        }

        public Person getMember(int id)
        {
            foreach (Person obj in persons)
            {
                if(obj.Id == id)
                {
                    return obj;
                }
            }

            throw new Exception("Nincs ilyen id");
        }

        public Person getMember(string name)
        {
            foreach (Person obj in persons)
            {
                if (obj.Name == name)
                {
                    return obj;
                }
            }

            throw new Exception("Nincs ilyen nev");
        }
    }

    // az indexer és az eljárás is ugyan azt csinálja, viszont az indexer optimalizaltabb
    // direkt erre kitalalt funkcio

    internal class Program
    {
        static void Main(string[] args)
        {
            // Person tesztelések:

            //Person p1 = new Person("Vivike", 10, new List<string>() { "abcdefaeghjhgukaheguhaeukgueab", "ufahufwafawfuwafhuwafwuafuuwaf" });
            //Person p2 = new Person("Balazs", 14, new List<string>() { "abcdefaeghjhgukaheguhaeukgueab", "ufahufwafawfuwafhuwafwuafuuwaf" });

            //Console.WriteLine($"{p1.Name} {p1.Age} éves, azonositoja #{p1.Id}");
            //Console.WriteLine($"{p2.Name} {p2.Age} éves, azonositoja #{p2.Id}");

            Family f = new Family();

            Person p3 = f.getMember(1); // eljárásos megoldás
            Person p4 = f[2];   // indexer

            Console.ReadLine();
        }
    }
}

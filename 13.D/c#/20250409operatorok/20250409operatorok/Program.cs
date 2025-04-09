using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace _20250409operatorok
{
    internal class Operator
    {
        public int Num1 { get; set; }
        public string Op {  get; set; }
        public int Num2 { get; set; }

        public Operator (int num1, string op, int num2)
        {
            this.Num1 = num1;
            this.Op = op;
            this.Num2 = num2;
        }
    }
    internal class Program
    {
        public static List<Operator> operations = new List<Operator> ();
        public static string[] allowedOps = { "mod", "/", "div", "-", "*", "+" };

        // 6. feladat
        public static string Calc(string inputString)
        {
            try
            {
                string[] inputValues = inputString.Split(' ');
                Operator operation = new Operator(Convert.ToInt32(inputValues[0]), inputValues[1], Convert.ToInt32(inputValues[2]));

                switch (operation.Op)
                {
                    case "/":
                        return $"{operation.Num1} / {operation.Num2} = {(double)operation.Num1 / (double)operation.Num2}";

                    case "-":
                        return $"{operation.Num1} - {operation.Num2} = {operation.Num1 - operation.Num2}";

                    case "*":
                        return $"{operation.Num1} * {operation.Num2} = {operation.Num1 * operation.Num2}";

                    case "+":
                        return $"{operation.Num1} + {operation.Num2} = {operation.Num1 + operation.Num2}";

                    case "mod":
                        return $"{operation.Num1} mod {operation.Num2} = {operation.Num1 % operation.Num2}";

                    case "div":
                        return $"{operation.Num1} div {operation.Num2} = {operation.Num1 / operation.Num2}";

                    default:
                        return $"{inputString} = Hibás operátor!";
                }
            } 
            catch 
            {
                return $"{inputString} = Egyéb hiba!";
            }
        }
        static void Main(string[] args)
        {
            // 1. feladat
            StreamReader reader = new StreamReader("../../kifejezesek.txt.");

            while (!reader.EndOfStream)
            {
                string[] line = reader.ReadLine().Split(' ');

                operations.Add(new Operator(Convert.ToInt32(line[0]), line[1], Convert.ToInt32(line[2])));
            }

            // 2. feladat
            Console.WriteLine($"2. feladat: Kifejezések száma: {operations.Count}");

            // 3. feladat
            Console.WriteLine($"3. feladat: Kifejezések maradékos osztással: {operations.Where(x => x.Op == "mod").ToArray().Length}");

            // 4. feladat
            bool isOperendusFound = false;
            for (int i = 0; i < operations.Count && !isOperendusFound; i++)
            {
                if (operations[i].Num1 % 10 == 0 && operations[i].Num2 % 10 == 0) 
                {
                    isOperendusFound = true;
                }
            }
            Console.WriteLine($"4. feladat:" + (isOperendusFound ? "Van ilyen kifejezés!" : "Nincs ilyen kifejezés!"));

            Dictionary<string, int> statistic = new Dictionary<string, int>();

            foreach (Operator op in operations) 
            {
                if(allowedOps.Contains(op.Op))
                {
                    if (statistic.ContainsKey(op.Op))
                    {
                        statistic[op.Op]++;
                    }
                    else
                    {
                        statistic.Add(op.Op, 1);
                    }
                }
            }

            // 5. feladat
            Console.WriteLine("5. feladat: Statisztika");
            foreach (var item in statistic)
            {
                Console.WriteLine($"\t{item.Key} \t-> \t{item.Value} db");
            }

            // 7. feladat
            while (true)
            {
                Console.Write("7. feladat: Kérek egy kifejezést (pl.: 1 + 1): ");
                string userInput = Console.ReadLine();
                if(userInput == "vége")
                {
                    break;
                }
                Console.WriteLine(Calc(userInput));
            }

            // 8. feladat
            StreamWriter writer = new StreamWriter("../../eredmenyek.txt");
            foreach (Operator operation in operations)
            {
                writer.WriteLine(Calc($"{operation.Num1} {operation.Op} {operation.Num2}"));
            }
            Console.WriteLine("8. feladat: eredmenyek.txt");

            Console.ReadLine();
        }
    }
}

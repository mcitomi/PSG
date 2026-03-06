#include <iostream>

int main()
{
    for (int i = 100; i > 0; i -= 3)
    {
        if (i % 2 == 0) {
            printf("\nA %d paros", i);
        }
        else 
        {
            printf("\nA %d paratlan", i);
        }
    }

    printf("\nMasodik feladat:\n");

    int tomb[] = { 3, 43, 45, 67, 4, 13, 5 };
    // printf("%d", tomb[2]);

    int tomb_hossza = sizeof(tomb) / sizeof(tomb[0]);

    // printf("\n%d", tomb_hossza);

    int osszeg = 0;

    for (int i = 0; i < tomb_hossza; i++)
    {
        osszeg += tomb[i];
    }

    printf("A tomb osszege: %d", osszeg);

    printf("\nHarmadik feladat:\n");

    osszeg = 0;

    for (int i = 1; i < 100; i++)
    {
        if (i != 50) {
            osszeg += i;
            printf("\n%d", i);
        }
    }

    printf("\n Az uj osszeg: %d", osszeg);
}

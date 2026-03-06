/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    char nev[50];   // Max 50 karakter hosszu lehet ez a karakter tömb
    printf("Hogy hivnak?");
    scanf("%s", nev);   // %s -> szöveg, string = karakter tömb

    printf("Szia %s!", nev);

    int n;  // egy egész szám eltárolása
    printf("Hany jegyet szertnel megadni?: ");
    scanf("%d", &n); // %d -> számot 

    float atlag = 0; // legebõpontos szám, pl 4.65, 3.67
    float sum = 0;  // tört számoknak

    int jegyek[n]; // a megadott "n" szám hosszú tömb létrehozása

    for (int i = 0; i < n; i++) // feltöltjük a tömb minden elemét
    {
        printf("%d. jegy:", i); // jegy számának kiírása
        scanf("%d", jegyek[i]); // beillesztjuk az aktualis helyre a tömbbe

    }
}
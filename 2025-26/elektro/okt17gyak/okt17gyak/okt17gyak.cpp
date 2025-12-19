// okt17gyak.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>

int main()
{
    int szam1 = 30;
    int szam2 = 40;

    int osszeg = szam1 + szam2;

    printf("Osszege: %d\n", osszeg);

    int kulonbsege = szam1 - szam2;

    printf("Kulonbsege: %d\n", kulonbsege);

    if (szam1 > szam2) {
        printf("%d", szam1 - szam2);
    }
    else if (szam1 < szam2) {
        printf("%d", szam2 - szam1);
    }
    else {
        printf("a ket szam egyenlo\n");
        szam1 = szam1 + 1;
        printf("%d", szam1);
    }
}


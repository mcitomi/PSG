#include <stdio.h>

int main()
{
    int foo[5] = {1, 2, 3, 4, 5};
    char name[20] = "Hello World!";   // string létrehozása
    char var;
    printf(name); // tömb kiíratása
    printf("\n%c", name[0]); // char tömb egy elemének kiíratása

    printf("\n%d", foo[2]); // tömb egy elemének kiíratása

    printf("\n%d", sizeof(foo)/sizeof(foo[0])); // tömb elemszámának kiíratása

    printf("\n%lu", sizeof(foo)); // tömb méretének kiíratása byte-ban

    for (int i = 0; i < (sizeof(foo)/sizeof(foo[0])); i++)
    {
        printf("\n%d", foo[i]); // tömb elemeinek kiíratása ciklussal
    }
    
    foo[2] = 42; // tömb egy elemének megváltoztatása
    printf("\n%d", foo[2]); // tömb egy elemének kiírat
    
    return 0;
}
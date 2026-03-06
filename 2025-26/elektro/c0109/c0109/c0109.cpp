#include <iostream>

int main()
{
	int szamok[] = { 2, 6, 7, 3, 13, 24, 6, 3, 5, 3, 5, 6, 4 };

	int tomb_hossza = sizeof(szamok) / sizeof(szamok[0]);

	printf("A tomb hossza: %d", tomb_hossza);

	int osszeg = 0;

	for (int i = 0; i < tomb_hossza; i++)
	{
		// csak azokat írassuk ki és adjuk az összegbe, ami oszható 3-al.

		if (szamok[i] % 3 == 0) {
			printf("\n%d", szamok[i]);
			osszeg += szamok[i];
		}
	}

	printf("\n\nA szamok osszege: %d", osszeg);


	char a = 'a';
	char b = 'b';

	char exitcode = 'x';

	printf("\n%c\n%c%c\n", exitcode, a, b);

	char karakterek[] = { 'a', 'l', 'm', 'a' };

	for (int i = 0; i < sizeof(karakterek) / sizeof(karakterek[0]); i++)
	{
		printf("%c", karakterek[i]);
	}


}

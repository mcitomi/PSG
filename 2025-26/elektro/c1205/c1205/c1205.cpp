#include <iostream>

int main()
{
	// for: 3-assával lépked, és csak a páratlanokat írja ki, 100-tól 0-ig
	/*for (int i = 100; i >= 0; i-=3)
	{
		if (i % 2 != 0) {
			printf("%d\n", i);
		}
	}
	*/
	// ctrl + k and c - kikommenteli a kijelölt blokkot
	// ctrl + k and u - visszavontja a kijelölt területet

	/*int szamok[] = { 3, 4, 5, 6, 7, 8, 67, 242, 96, 42, 4, 10, 15, 3, 9 };

	int hossza = sizeof(szamok) / sizeof(szamok[0]);

	printf("A tomb hossza: %d\n", hossza);*/

	/*for (int i = 0; i < hossza; i++)
	{
		if (szamok[i] % 2 == 0) 
		{
			printf("A %d paros, ezert duplaja %d\n", szamok[i], szamok[i] * 2);
		}
		else 
		{
			printf("A %d paratlan, ezert a triplaja %d\n", szamok[i], szamok[i] * 3);
		}
	}*/

	// Minden számot szorozzunk meg a saját sorszámával

	/*for (int i = 0; i < hossza; i++)
	{
		printf("%d sorszama: %d, ezek szorzata: %d\n", szamok[i], i + 1, szamok[i] * (i + 1));
	}*/



	printf("%d\n", 9 % 6);
	printf("%d\n", 9 / 6);
}

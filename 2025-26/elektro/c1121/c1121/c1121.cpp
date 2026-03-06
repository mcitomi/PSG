
#include <iostream>

int main()
{
	// ciklusok

	//printf("Hello");

	int i = 0;

	char szoveg[] = "Belaba";

	/*printf("\n%d", sizeof(tomb[0]));
	printf("\n%d", sizeof(tomb));
	printf("\n%d", sizeof(tomb) / sizeof(tomb[0]));*/

	while (i < sizeof(szoveg) / sizeof(szoveg[0])) {
		printf("\n%c", szoveg[i]);
		
		i++;
	}

	int tomb[] = { 2, 6, 3, 4 , 4, 7, 6, 12, 35, 53, 25, 23 };

	for (int i = 0; i < sizeof(tomb) / sizeof(tomb[0]); i++)
	{
		printf("%d ", tomb[i]);

	}

	printf("\n---------\n");

	for (int i = 1; i < 11; i++)
	{
		for (int j = 1; j < 11; j++) {
			printf("%d ", i * j);
		}
		printf("\n");
	}
}

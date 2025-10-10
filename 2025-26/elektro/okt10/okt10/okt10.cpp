# include <stdio.h>

int main()
{
	int a, b;

	printf("Adj meg ket szamot: ");

	scanf_s("%d %d", &a, &b);

	printf("Osszeguk: %d", a + b);

	if (a > b) {
		printf("\n%d-bol %d egyenlo %d", a, b, a - b);
	}
	else if (b > a) {
		printf("\n%d-bol %d egyenlo %d", b, a, b - a);
	}
	else {
		printf("\nA ket szam egyenlo");
	}

	for (int i = 0; i < 10; i++) {
		printf("\n%d ", i);
	}
}
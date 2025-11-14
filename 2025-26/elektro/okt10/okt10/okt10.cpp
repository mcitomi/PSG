# include <stdio.h>

int main()
{
	int szam = 10;
	int szam2 = 20;
	szam++;
	szam = szam + 1;
	if (szam < 11) {
		printf("kisebb");
	}
	else if(szam > 11)
	{
		printf("nagyobb");
	}
	else
	{
		printf("egyenlo");
	}
	
}

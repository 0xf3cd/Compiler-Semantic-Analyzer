#include <stdio.h>

float inputf;
int inputi;

float readf() {
	scanf("%f", &inputf);
	return inputf;
}

void writef(float f) {
	printf("%f\n", f);
}

int readi() {
	scanf("%d", &inputi);
	return inputi;
}

void writei(int i) {
	printf("%d\n", i);
}

int ftoi(int f) {
	return (int)(f);
}

float itof(int i) {
	return (float)(i);
}
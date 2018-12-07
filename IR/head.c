#include <stdio.h>

float readf() {
	float f;
	scanf("%f", &f);
	return f;
}

void writef(float f) {
	printf("%f", f);
}

int readi() {
	int i;
	scanf("%d", &i);
	return i;
}

void writei(int i) {
	printf("%d", i);
}

/* 返回所读入的字符的 ascii 码 */
int readc() {
	char c;
	scanf("%c", &c);
	return (int)(c);
}

/* 输出 ascii 码对应的字符 */
void writec(int i) {
	printf("%c", (char)(i));
}

int ftoi(int f) {
	return (int)(f);
}

float itof(int i) {
	return (float)(i);
}
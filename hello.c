#include <stdio.h>
int main()
{
 unsigned short a; 
 unsigned char *c; // pointer to char
 void *p;  // pointer to unnamed type
 a = 65535; // 2^16 -1
 p = &a;  // point to a’s memory location
 c = p;
 printf("dereferenced value is : %d\n", *c);
}

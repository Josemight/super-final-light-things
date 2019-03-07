#include <EduIntro.h>

Potentiometer pot(A5);
Led led(D9);
int brightness = 64;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  brightness = map(pot.read(), 0, 1023, 0, 255);
  led.brightness(brightness);

  Serial.print("brightness = ");
  Serial.println(brightness);
  delay(10);
}

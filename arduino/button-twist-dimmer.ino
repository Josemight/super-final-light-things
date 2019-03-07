#include <EduIntro.h>

Potentiometer pot(A5);
Led led(D9);
Button button(D2);
int brightness = 64;

void setup()
{
}

void loop()
{
  if (button.readSwitch() == false)
  {
    brightness = map(pot.read(), 0, 1023, 0, 255);
    led.brightness(brightness);
  }
  else
  {
    led.off();
  }
}

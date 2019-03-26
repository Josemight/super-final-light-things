#include <EduIntro.h>

Button onOff(D2);
Button plus(D7);
Button minus(D8);
int ledPin = 9;
int controllPin = 3;
int brightness = 32;
int step = 4;

void setup()
{
  Serial.begin(9600);
}

void loop()
{

  if (onOff.readSwitch() == false) // Light switch is on
  {
    if (plus.pressed() || plus.held())
    {
      brightness += step;
      if (brightness > 255)
        brightness = 255;
    }
    if (minus.pressed() || minus.held())
    {
      brightness -= step;
      if (brightness < 1)
        brightness = 1;
    }
    analogWrite(ledPin, brightness);
    analogWrite(controllPin, 128);
  }
  else
  {
    analogWrite(ledPin, 0);
    analogWrite(controllPin, 0);
  }
  Serial.println(brightness);
  delay(20);
}

#include <EduIntro.h>

Button button(D2);
int ledPin = 9;
int brightness = 32;
int step = 4;
int direction = -1;
bool on = true;
bool hasDimmed = false;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (on)
  {
    if (button.held())
    {
      if (hasDimmed == false)
      {
        direction *= -1;
      }
      brightness += step * direction;
      hasDimmed = true;
    }
    if (brightness > 255)
      brightness = 255;
    if (brightness < 0)
      brightness = 0;
    analogWrite(ledPin, brightness);
  }
  else
  {
    analogWrite(ledPin, 0);
  }

  if (button.released())
  {
    if (hasDimmed == false)
    {
      on = !on;
    }
    hasDimmed = false;
  }
  delay(50);
}

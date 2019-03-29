#include <Adafruit_NeoPixel.h>

const byte numLeds = 24;
const byte brightness = 100;
Adafruit_NeoPixel leds = Adafruit_NeoPixel(numLeds, 3);

byte rgb[3]{0, 0, 0};
byte cubes[9]{5, 6, 7, 8, 9, 10, 11, 12, 13};

void setup()
{
  leds.begin();
  leds.setBrightness(brightness);
  leds.show();

  for (byte i = 0; i < 9; i++)
  {
    pinMode(cubes[i], INPUT_PULLUP);
  }
}

void loop()
{
  for (byte i = 0; i < 3; i++)
  {
    rgb[i] = 0;
  }

  for (byte i = 0; i < 9; i++)
  {
    if (digitalRead(cubes[i]) == LOW)
    {
      rgb[i % 3]++;
    }
  }

  for (byte i = 0; i < numLeds; i++)
  {
    leds.setPixelColor(i, leds.Color(rgb[0] * 85, rgb[1] * 85, rgb[2] * 85));
  }
  leds.show();
}

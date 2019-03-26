#include <FastLED.h>

const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];
bool newData = false;

CHSV leds[numLeds];

const byte numLeds = 12;

void setup()
{
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, 9>(leds, numLeds);
}

void loop()
{
  receiveWithStartEndMarkers();

  if (newData == true)
  {
    strcpy(tempChars, receivedChars);
    parseData();
    newData = false;
    setLeds();
  }

  if (firstLoop)
  {
    setLeds();
    firstLoop = false;
  }
}

void setLeds()
{
  for (int i = 0; i < numLeds; i++)
  {
    leds[i] = CHSV(h, 255, v);
  }
}

void receiveWithStartEndMarkers()
{
  static boolean receiveInProgress = false;
  static byte index = 0;
  char startMarker = '<';
  char endMarker = '>';
  char receivedChar;

  while (Serial.available() > 0 && newData == false)
  {
    receivedChar = Serial.read();

    if (receiveInProgress == true)
    {
      if (receivedChar != endMarker)
      {
        receivedChars[index] = receivedChar;
        index++;
        if (index >= numChars)
        {
          index = numChars - 1;
        }
      }
      else
      {
        receivedChars[index] = '\0'; // terminate the string
        receiveInProgress = false;
        index = 0;
        newData = true;
      }
    }

    else if (receivedChar == startMarker)
    {
      receiveInProgress = true;
    }
  }
}

void parseData()
{
  char *strtokIndex;
  int table;

  strtokIndex = strtok(tempChars, ",");
  table = atoi(strtokIndex);

  for (int i = 0; i < 3; i++)
  {
    strtokIndex = strtok(NULL, ",");
    colors[table][i] = atoi(strtokIndex);
  }
}
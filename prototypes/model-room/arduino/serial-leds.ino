#include <Adafruit_NeoPixel.h>

const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];
char messageFromPC[numChars] = {0};
int integerFromPC = 0;
float floatFromPC = 0.0;
boolean newData = false;

const byte brightness = 100;
Adafruit_NeoPixel leds = Adafruit_NeoPixel(3, 9);
int colors[3][3] = {
    {12, 34, 234},
    {123, 45, 67},
    {89, 176, 45}};

int ledGroup[3]{
    1,
    1,
    0};

void setup()
{
  Serial.begin(9600);
  leds.begin();
  leds.setBrightness(brightness);
  leds.show();
}

void loop()
{
  receiveWithStartEndMarkers();

  if (newData == true)
  {
    strcpy(tempChars, receivedChars);

    parseData();

    // Debug: print parsed command to serial
    // showParsedData();
    newData = false;
  }

  byte ledCount = leds.numPixels();

  for (int i = 0; i < ledCount; i++)
  {
    leds.setPixelColor(i, leds.Color(colors[ledGroup[i]][0], colors[ledGroup[i]][1], colors[ledGroup[i]][2]));
  }
  leds.show();
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
{                    // split the data into its parts
  char *strtokIndex; // this is used by strtok() as an index
  int table;

  strtokIndex = strtok(tempChars, ",");
  table = atoi(strtokIndex);

  for (int i = 0; i < 3; i++)
  {
    strtokIndex = strtok(NULL, ",");
    colors[table][i] = atoi(strtokIndex);
  }
}
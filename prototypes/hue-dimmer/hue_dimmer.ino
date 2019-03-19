// EduIntro - Version: Latest 
#include <EduIntro.h>
#include <pitches.h>
#include <FastLED.h>

#define NUM_LEDS 24
// Data pin for the LEDs
#define DATA_PIN 9

int lastPotentiometerOneValue = 0;
int lastPotentiometerTwoValue = 0;

Potentiometer pot1(A0);
Potentiometer pot2(A1);

CRGB leds[NUM_LEDS];


void setup() {
  // initialize serial communication at 57600 bits per second:
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void loop() {
  delay(10);
  readAndSendPotentiometerDataIfChanged();
}

void readAndSendPotentiometerDataIfChanged(void) {

  //Potentiometer One
  int newPotentiometerOneValue = pot1.readStep(255);
  int newPotentiometerTwoValue = pot2.readStep(255); 
  
  bool hasChanged = newPotentiometerOneValue != lastPotentiometerOneValue || newPotentiometerTwoValue != lastPotentiometerTwoValue;
    

  //Potentiometer Two, sets colors
  if (hasChanged) {
    
    setColorOnAllLeds(newPotentiometerTwoValue, newPotentiometerOneValue);
    
    Serial.print("pos1: ");
    Serial.println(newPotentiometerOneValue);
    Serial.print("pos2: ");
    Serial.println(newPotentiometerTwoValue);

    FastLED.show();
  
    lastPotentiometerOneValue = newPotentiometerOneValue;
    lastPotentiometerTwoValue = newPotentiometerTwoValue;
  }
}

void setColorOnAllLeds(int h, int v) {
  for(int i = 0; i < 24; i++) {
    CHSV color = CHSV(h, 255, v);
    leds[i] = color;
  }
}
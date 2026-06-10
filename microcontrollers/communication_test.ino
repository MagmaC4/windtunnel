// Ardunio code
// Generate random numbers and send to serial buffer

long randNum;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200); // select serial channel to communicate on 
  randomSeed(analogRead(0)); // generate random seed from analog noise from pin 0

  Serial.print("Starting...\n");
}

void loop() {
  // print to serial every 10 seconds
  randNum = random(175, 500);
  Serial.println(randNum);
  delay(250);
}

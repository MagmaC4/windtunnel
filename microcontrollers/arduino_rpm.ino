#define IRpin 2
#define TIMEOUT 2000 // milliseconds to reset rpm

// This script counts the RPM of a spinning motor using
// an IR sensor and a reflective piece of tape.

// 1 = NO REFLECTION
// 0 = REFLECTION 

int rpm = 0;
unsigned long curr_timestamp = 0;
unsigned long prev_timestamp = 0;
int prev_IRread = 1;

void calculateRPM(){
  // 1000 milliseconds / (rotation time in milliseconds) * 60 seconds
  rpm = 1000.0 / (curr_timestamp - prev_timestamp) * 60;
}

void setup() {
  // put your setup code here, to run once:
  pinMode(IRpin, INPUT);
  Serial.begin(115200);
}

void loop() {
  // Detect if reflective tape is infront of IR reading
  int IRread = digitalRead(IRpin);

  // Record time of rotation on rising edge
  if (IRread == 0 && prev_IRread == 1){
    curr_timestamp = millis();
    calculateRPM();
    prev_timestamp = curr_timestamp;
  }

  // if motor stopped spinning, reset rpm to 0
  if (millis() - curr_timestamp > 2000){
    rpm = 0;
  }

  prev_IRread = IRread;

  // Print rpm to serial buffer
  Serial.println(rpm);
  

}

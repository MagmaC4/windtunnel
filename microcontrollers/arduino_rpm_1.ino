#define IRpin 2
#define INTERVAL 5000
#define NUM_SECONDS (INTERVAL / 1000)

// Ardunio
// This script counts the RPM of a spinning motor using
// an IR sensor and a reflective piece of tape.

// 1 = NO REFLECTION
// 0 = REFLECTION 

int interval_count[NUM_SECONDS]; // replace with num_seconds
int second = 0;
int prev_second = second;
int prev_IRread = 1;

// Return RPM from interval_count
float count_rpm(){
	// To correctly count rpm, we must not include the current second.
	// The count for the current second is in progress and therefore
	// will be inaccurate.
	int count = 0;
	for (int i = 0; i < NUM_SECONDS; i++){
		if (i != second){ 
			count += interval_count[i];
		}
	}

	// calculate rpm 
	float rpm = (float) count / (NUM_SECONDS - 1) * 60;
	return rpm;
}

void setup() { 
	// put your setup code here, to run once: 
	pinMode(IRpin,INPUT); 
	Serial.begin(115200);

	// initialize array with zero
	for (int i = 0; i < NUM_SECONDS; i++){
		interval_count[i] = 0;
	}

} 

void loop() { 
	// Collect IR Reading
	int IRread = digitalRead(IRpin); 

	// Output IR reading
	// Serial.println(!IRread);

	// =====================================================

	// Figure out which second you are counting rotations in
	second = floor((millis() % INTERVAL) / 1000);

	// Reset new counter when entering a new second
	if (second != prev_second){
		interval_count[second] = 0;
	}

	// Increment rotations when IR sensor detects a reflection
	// Only count on a rising edge of detection (prev_IRread)
	if(IRread == 0 && prev_IRread == 1){
		interval_count[second]++;
	}

	prev_second = second;
	prev_IRread = IRread;

	Serial.println(count_rpm());
} 

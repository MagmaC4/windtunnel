from gpiozero import DigitalInputDevice
from time import sleep
from time import time_ns

IR_PIN = 17
TIMEOUT = 5
NANO = 1000000000

ir_sensor = DigitalInputDevice(IR_PIN)
previous_IRread = False
previous_ts = time_ns()
recent_ts = time_ns()
rpm = 0

# IR Reading Legend:
# 0 = Off
# 1 = On 

def calculate_rpm(recent_ts : int, previous_ts : int) -> int: 
    # Using nanosecond timestamps, 1,000,000,000 = 1 second
    # Check if diff is 0 to avoid divide by zero error
    diff = recent_ts - previous_ts
    if diff == 0:
        return 0
    return NANO // (diff) * 60

while True:
    print(f"Sensor reading: {ir_sensor.is_active}")

    # Update RPM on rising edge
    if ir_sensor.is_active and not previous_IRread:
        recent_ts = time_ns()
        rpm = calculate_rpm(recent_ts, previous_ts)
        previous_ts = recent_ts

    # Set RPM to zero if timeout is reached
    if (time_ns() - previous_ts > TIMEOUT * NANO):
        rpm = 0

    previous_IRread = ir_sensor.is_active

    print(f"RPM: {rpm}")
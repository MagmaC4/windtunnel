from gpiozero import DigitalInputDevice
from time import time_ns

# RPM is measured by a function 
# Function blocks until a full rotation is made, or timeout is reached

IR_PIN = 17
TIMEOUT = 5
NANO_TO_SECONDS = 1000000000

# TODO: Send error when this pin is not receiving anything
ir_sensor = DigitalInputDevice(IR_PIN)

def get_rpm() -> int:
    # Time since measurement attempt started
    # Used exclusively for timeout checking
    function_ts = time_ns()

    def has_timeout() -> bool:
        return (time_ns() - function_ts) > (TIMEOUT * NANO_TO_SECONDS)
        
    # Block until falling edge
    while ir_sensor.is_active:
        if has_timeout(): return 0
    # Block until rising edge 
    while not ir_sensor.is_active:
        if has_timeout(): return 0

    start_ts = time_ns()

    # Block until falling edge
    while ir_sensor.is_active:
        if has_timeout(): return 0
    # Block until rising edge 
    while not ir_sensor.is_active: 
        if has_timeout(): return 0

    end_ts = time_ns()

    rpm = NANO_TO_SECONDS / (end_ts - start_ts) * 60

    # Debugging
    print(f"elapsed nanoseconds: {end_ts - start_ts}")
    print(f"elapsed milliseconds: {(end_ts - start_ts) / 1_000_000:.2f}")
    print(f"rpm: {rpm}")

    return int(rpm)

    

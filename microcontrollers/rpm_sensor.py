from gpiozero import DigitalInputDevice
from time import time_ns
from time import sleep

# RPM is measured by a function 
# Function blocks until a full rotation is made, or timeout is reached

IR_PIN = 17
NANO_TO_SECONDS = 1000000000
RPM_LIMIT = 2500
TIMEOUT = 5

# TODO: Send error when this pin is not receiving anything
ir_sensor = DigitalInputDevice(IR_PIN, pull_up=True, bounce_time=0.005)

def get_rpm() -> int:
    # Time since measurement attempt started
    # Used exclusively for timeout checking
    function_ts = time_ns()

    def has_timeout() -> bool:
        return (time_ns() - function_ts) > (TIMEOUT * NANO_TO_SECONDS)

    def block_until_rising_edge() -> bool:
        while ir_sensor.is_active:
            if has_timeout(): return False
        while not ir_sensor.is_active:
            if has_timeout(): return False
        return True


    # Calculate rpm by measuring start and end rotation timestamps
    if not block_until_rising_edge():
        return 0  # Timeout
    start_ts = time_ns()
    sleep(0.001)
    if not block_until_rising_edge():
        return 0 # Timeout
    end_ts = time_ns()
    elapsed_ns = end_ts - start_ts
    rpm = NANO_TO_SECONDS / (elapsed_ns) * 60
    print("=========================================================")
    print(f"Elapsed Nanoseconds: {elapsed_ns}")

    # Raise error if rpm exceeds limit (aka IR reading bounced back)
    if rpm > RPM_LIMIT:
        raise Exception(f"\nRPM limit of {RPM_LIMIT} exceeded: {rpm}")

    return int(rpm)

    

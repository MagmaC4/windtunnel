from gpiozero import DigitalInputDevice
from time import sleep

ir_sensor = DigitalInputDevice(17)

while True:
    if ir_sensor.is_active:
        print("Object detected")
    else:
        print("Nothing detected")
    sleep(0.2)
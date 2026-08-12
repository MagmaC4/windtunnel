import time
import board

import adafruit_pcf8591.pcf8591 as PCF
from adafruit_pcf8591.analog_in import AnalogIn
from adafruit_pcf8591.analog_out import AnalogOut

i2c = board.I2C()
pcf = PCF.PCF8591(i2c)

pcf_in_0 = AnalogIn(pcf, PCF.A0)


while True:
    raw_value = pcf_in_0.value
    scaled_value = (raw_value / 65535) * pcf_in_0.reference_voltage

    a = 2.78 * (10 ** -3)
    b = 1.27 * (10 ** -3)
    c = -7.95 * (10 ** -3) - scaled_value

    # use quadratic formula


    air_speed = (-b + (b ** 2 - 4 * a * c) ** 0.5) / (2 * a)

    print("Pin 0: %0.5fV" % (scaled_value))
    print("Air Speed: %0.5fm/s" % (air_speed))
    print("")
    time.sleep(0.5)



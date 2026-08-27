import time
import board

import adafruit_pcf8591.pcf8591 as PCF
from adafruit_pcf8591.analog_in import AnalogIn
from adafruit_pcf8591.analog_out import AnalogOut

# Reads Voltage from an Analog to Digital Converter

i2c = board.I2C()
pcf = PCF.PCF8591(i2c)
  
pcf_in_0 = AnalogIn(pcf, PCF.A0)


while True:
	raw_value = pcf_in_0.value
	scaled_value = (raw_value / 65535) * pcf_in_0.reference_voltage
	print("Pin 0: %0.5fV" % (scaled_value))
	print("")
	time.sleep(0.5)


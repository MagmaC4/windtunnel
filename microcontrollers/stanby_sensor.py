import time
import board

import adafruit_pcf8591.pcf8591 as PCF
from adafruit_pcf8591.analog_in import AnalogIn
from adafruit_pcf8591.analog_out import AnalogOut

i2c = board.I2C()
pcf = PCF.PCF8591(i2c)

# define analog channels
pcf_in_0 = AnalogIn(pcf, PCF.A0)


while True:
    # Read voltage from analog channel
    raw_value = pcf_in_0.value
    scaled_value = (raw_value / 65535) * pcf_in_0.reference_voltage

    # ON / OFF Determination
    windTunnelOn = (scaled_value != 0)
    if windTunnelOn:
        print("Tunnel is on")
    else:
        print("Tunnel is off")

    time.sleep(0.5)


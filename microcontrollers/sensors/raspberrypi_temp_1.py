import time
import board
import busio
from adafruit_bmp5xx import BMP5XX

# Initialize I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Initialize the BMP581 sensor
bmp = BMP5XX.over_i2c(i2c)

# Set your local sea-level pressure in hPa for accurate altitude readings
bmp.sea_level_pressure = 1013.25

while True:
    if bmp.data_ready:
        temp_c = bmp.temperature
        temp_f = temp_c * 1.8 + 32
        pressure = bmp.pressure
        altitude = bmp.altitude
        
        print(f"Temperature: {temp_c:.2f} C ({temp_f:.2f} F)")
        print(f"Pressure: {pressure:.2f} hPa")
        print(f"Altitude: {altitude:.2f} meters")
        print("-" * 20)
        
    time.sleep(1.0)
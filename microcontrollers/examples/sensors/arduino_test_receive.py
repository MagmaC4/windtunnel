import serial
import time

arduino = serial.Serial(port='/dev/cu.usbmodem1101', baudrate=115200, timeout=2)
time.sleep(2)  # wait for Arduino to boot

try:
    while True:
        data = arduino.readline().decode('utf-8').strip()
        if data:
            print(data)
except KeyboardInterrupt:
    print("Stopping...")
finally:
    arduino.close()  # always runs, even if there's an error
    print("Serial connection closed")
"""
This script is to test using input / output from an arduino serial channel. 
Communication with an arduino requires the arudino port to be open on '/dev/cu.usbmodem101'.

The user is prompted to input a number
The number is sent to the arduino's serial channel
The arduino returns the number + 1

"""

import serial 
import time 

# arduino socket
# arduino = serial.Serial(port='COM4', baudrate=115200, timeout=.1) 
arduino = serial.Serial(port='/dev/cu.usbmodem101', baudrate=115200, timeout=.1) 

def write_read(x): 
    arduino.write(bytes(x, 'utf-8')) 
    time.sleep(0.05) 
    data = arduino.readline() 
    return data 

# Main loop
while True: 
    num = input("Enter a number: ") # Taking input from user 
    value = write_read(num) 
    print(value) # printing the value 

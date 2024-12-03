
# import serial
# import json
# import requests
# from requests.auth import HTTPBasicAuth
# import time


# class DeviceManager:
#     REQUEST_ENDPOINT = ""
#     INTERVAL = 30
#     STORAGE_DATA = {
#         'device_id': '',
#         'password': '',
#     }

#     def __init__(self, SERVER_URL: str, INTERVAL: int, new_storage_data: dict):
#         self.REQUEST_ENDPOINT = f"{SERVER_URL}/api/projects/device/{new_storage_data['device_id']}/stream/"
#         self.INTERVAL = INTERVAL
#         self.update_storage_data(new_storage_data)

#     def start(self):
#         error_counter = 0
#         while error_counter < 5:
#             response = self.send_data(self.get_current_sensor_data())
#             if response is None:
#                 error_counter += 1

#     def get_current_sensor_data(self):
#         return {
#         }

#     def handleError(self, e: requests.exceptions.RequestException):
#         if not hasattr(e, 'response'):
#             print("Unprocessable Error:", e)
#         elif e.response.status_code in [400, 422]:
#             print("Validation error", e.response.json())
#         elif e.response.status_code == 401:
#             print(f"Authenticated request failed: {e}")
#         elif e.response.status_code == 500:
#             print("Server error: contact to admins or your teacher")
#         else:
#             print("Error:", e)

#     def update_storage_data(self, new_data: dict):
#         for key, value in new_data.items():
#             if key in self.STORAGE_DATA.keys():
#                 self.STORAGE_DATA[key] = value

#     def make_authenticated_post(self, url, data):
#         print("Request data", data)
#         try:
#             response = requests.post(url, json=data)
#             response.raise_for_status()
#             return response.json()
#         except requests.exceptions.RequestException as e:
#             self.handleError(e)
#             return None

#     def send_data(self, data):
#         return self.make_authenticated_post(self.REQUEST_ENDPOINT, {
#             'sensor_data_list': data,
#             'password': self.STORAGE_DATA['password']
#         })


# # HERE you can modufy how pass the data to server
# DEVICE_ID = 1
# PASSWORD = "password"
# SERIAL_PORT = "COM4"

# # Custom configuration
# SERVER_URL = "https://smedufacelearn.kz"
# SEND_INTERVAL = 30  # in seconds
# device = DeviceManager(SERVER_URL=SERVER_URL, INTERVAL=SEND_INTERVAL, new_storage_data={
#     "device_id": DEVICE_ID,
#     'password': PASSWORD
# })


# def serial_listener(device_app: DeviceManager, port, baudrate=9600):

#     try:
#         # Open the serial port
#         ser = serial.Serial(port, baudrate)
#         print(f"Serial port {port} opened successfully.")
#         # Main loop to listen for data
#         while True:
#             # Read a line of data from the serial port
#             data = ser.readline().decode("utf-8").strip()

#             data: dict = json.loads(data)

#             # Print the received data
#             print(f"Received data: {data}")

#             send_data_list = []
#             for key in data.keys():
#                 send_data_list.append({
#                     'field': key,
#                     'value': data[key]
#                 })
#             if len(send_data_list) > 0:
#                 device_app.send_data(send_data_list)
#                 time.sleep(SEND_INTERVAL)

#     except serial.SerialException as e:
#         print(f"Error: {e}")

#     finally:

#         # Close the serial port when the program exits
#         if ser.is_open:
#             ser.close()
#             print("Serial port closed.")


# # Replace "COM3" with the actual port of your Arduino
# serial_listener(device, SERIAL_PORT)
import serial.tools.list_ports

def find_arduino_port():
    # Get a list of all available serial ports
    ports = list(serial.tools.list_ports.comports())

    if not ports:
        print("No serial ports found.")
    else:
        print("Available serial ports:")
        for port in ports:
            print(f"   {port.device}")

            # Check if the device is an Arduino by examining its description or manufacturer
            if "Arduino" in port.description or "Arduino" in port.manufacturer:
                print(f"   --> Arduino found on {port.device}")
                return port.device

    print("No Arduino found.")
    return None

find_arduino_port()    
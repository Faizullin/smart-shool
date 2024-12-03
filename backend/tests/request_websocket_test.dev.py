import asyncio
import json
import random

import websockets

# Customize
DEVICE_ID =2 # Device id from broadcast page
DEVICE_PASSWORD = 'dev.password@1234'  # Device password from broadcast page
URL = f'wss://security.org.kz/ws/projects/broadcast/{DEVICE_ID}/device/?password={DEVICE_PASSWORD}'

async def websocket_reader(websocket):
    async for input_data in websocket:
        try:
            if type(input_data) is not str:
                print("Error: message type is not string")
                continue
            received_data = json.loads(input_data)
            if received_data.get('type') == "send_command":
                print(f"Received command: {received_data['data']['command']}")
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
        except Exception as e:
            print(f"Error processing received data: {e}")

async def websocket_sender(websocket):
    while True:
        try:
            # Simulate sensor data
            simulated_data = {
                "temp": round(random.uniform(20.0, 30.0), 2),
                "hum": round(random.uniform(40.0, 60.0), 2)
            }
            sensor_data_list = [
                {'field': key, 'value': value} for key, value in simulated_data.items()
            ]
            submit_data = {
                "type": "new_submit",
                "data": {'sensor_data_list': sensor_data_list}
            }
            await websocket.send(json.dumps(submit_data))
            print(f"Data sent to WebSocket: {submit_data}")

            # Wait for a random interval between 1 and 20 seconds
            delay = random.randint(1, 20)
            print(f"Next send in {delay} seconds...")
            await asyncio.sleep(delay)

        except websockets.ConnectionClosed as err:
            print(f"WebSocket connection closed: {err.code} {err.reason}")
            break
        except Exception as e:
            print(f"Error sending data: {e}")
            break

async def main():
    try:
        async with websockets.connect(URL) as websocket:
            tasks = [websocket_reader(websocket), websocket_sender(websocket)]
            await asyncio.gather(*tasks)
    except websockets.ConnectionClosed as err:
        print(f"WebSocket connection closed: {err.code} {err.reason}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

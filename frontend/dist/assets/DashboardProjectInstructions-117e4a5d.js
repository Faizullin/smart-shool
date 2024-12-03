import{j as e,ap as t,F as s}from"./index-33e0424c.js";import{P as o,D as n}from"./ProjectLayout-e7fee23d.js";import{d as r}from"./index-9d4c6f9e.js";const a=`import serial.tools.list_ports

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

find_arduino_port()`,i=`
import asyncio
import json
import random

import websockets

# Customize
DEVICE_ID = None
API_KEY = ''  # Device api key from broadcast page
URL = f'ws://localhost:8000/ws/projects/broadcast/{DEVICE_ID}/device/?key={API_KEY}'


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

`,p=()=>e.jsx(o,{children:e.jsx("div",{children:e.jsxs(t,{defaultActiveKey:"0",children:[e.jsxs(t.Item,{eventKey:"0",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_0"})}),e.jsx(t.Body,{children:e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_0"})})})]}),e.jsxs(t.Item,{eventKey:"1",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_1"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_1"})}),e.jsx(r,{height:"30vh",defaultLanguage:"python",defaultValue:a,options:{readOnly:!0}})]})]}),e.jsxs(t.Item,{eventKey:"2",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_2"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_2"})}),e.jsx(r,{height:"60vh",defaultLanguage:"python",defaultValue:i,options:{readOnly:!0}})]})]}),e.jsxs(t.Item,{eventKey:"3",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_3",defaultMessage:"C++ Arduino JSON Data"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_3"})}),e.jsx(r,{height:"40vh",defaultLanguage:"cpp",defaultValue:n,options:{readOnly:!0}})]})]})]})})});export{p as default};

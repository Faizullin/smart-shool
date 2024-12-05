import{j as e,ap as t,F as s}from"./index-e2e70fbc.js";import{P as i,D as a}from"./ProjectLayout-038f2558.js";import{d as r}from"./index-0c17e776.js";const o=`import serial.tools.list_ports

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

find_arduino_port()`,n=`
import asyncio
import json

import serial
import websockets

# Customize
DEVICE_ID = None
API_KEY = ''  # Device api key from broadcast page
URL = f'wss://smedufacelearn.kz/ws/projects/broadcast/{DEVICE_ID}/device/?key={API_KEY}'
DELAY_INTERVAL = 10
SERIAL_BAUDRATE = 9600
SERIAL_PORT = None  # Serial port for Arduino


async def websocket_reader(websocket, serial_port):
    async for input_data in websocket:
        try:
            if type(input_data) is not str:
                print("Error: message type is not string")
            received_data = json.loads(input_data)
            if received_data['type'] == "send_command":
                print(
                    f"Received message: {received_data['data']['command']}")
        except serial.SerialException as e:
            print(f"Serial port error: {e}")


async def websocket_sender(websocket, serial_port):
    while True:
        try:
            input_data = serial_port.readline().decode("utf-8").strip()
            if input_data:
                print(f"Serial: received data: {input_data}")
                input_data = json.loads(input_data)
                sensor_data_list = []
                for key in input_data.keys():
                    sensor_data_list.append({
                        'field': key,
                        'value': input_data[key]
                    })
                if sensor_data_list:
                    submit_data = {
                        "type": "new_submit",
                        "data": {
                            'sensor_data_list': sensor_data_list
                        }
                    }
                    await websocket.send(json.dumps(submit_data))
                    print(f"Websocket.send: Data submitted: {submit_data}")

                    await asyncio.sleep(DELAY_INTERVAL)

        except serial.SerialException as e:
            print(f"Serial port error: {e}")
            break
        await asyncio.sleep(DELAY_INTERVAL)


async def main():
    serial_port = serial.Serial(SERIAL_PORT, baudrate=SERIAL_BAUDRATE)
    print(
        f"Serial port {serial_port}({SERIAL_PORT},{SERIAL_BAUDRATE}) opened successfully.")
    try:
        async with websockets.connect(URL) as websocket:
            tasks = [websocket_reader(websocket, serial_port),
                     websocket_sender(websocket, serial_port)]
            await asyncio.gather(*tasks)

    except websockets.ConnectionClosed as err:
        print(f"Websocket connection closed: {err}")


if __name__ == "__main__":
    asyncio.run(main())


`,p=()=>e.jsx(i,{children:e.jsx("div",{children:e.jsxs(t,{defaultActiveKey:"0",children:[e.jsxs(t.Item,{eventKey:"0",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_0"})}),e.jsx(t.Body,{children:e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_0"})})})]}),e.jsxs(t.Item,{eventKey:"1",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_1"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_1"})}),e.jsx(r,{height:"30vh",defaultLanguage:"python",defaultValue:o,options:{readOnly:!0}})]})]}),e.jsxs(t.Item,{eventKey:"2",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_2"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_2"})}),e.jsx(r,{height:"60vh",defaultLanguage:"python",defaultValue:n,options:{readOnly:!0}})]})]}),e.jsxs(t.Item,{eventKey:"3",children:[e.jsx(t.Header,{children:e.jsx(s,{id:"dashboard.instructions_title_3",defaultMessage:"C++ Arduino JSON Data"})}),e.jsxs(t.Body,{children:[e.jsx("p",{children:e.jsx(s,{id:"dashboard.instructions_body_3"})}),e.jsx(r,{height:"40vh",defaultLanguage:"cpp",defaultValue:a,options:{readOnly:!0}})]})]})]})})});export{p as default};

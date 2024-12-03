export const SearchArduinoCom = `import serial.tools.list_ports

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

find_arduino_port()`;

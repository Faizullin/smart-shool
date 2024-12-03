import { IDevice } from "@/core/models/IDevice";

export const DefaultArduinoCode = `const int analogPin = A0; // Analog pin where your sensor is connected

void setup() {
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  int sensorValue = analogRead(analogPin); // Read analog data from the sensor
  float voltage = sensorValue * (5.0 / 1023.0); // Convert to voltage (assuming a 5V Arduino)

  // Create a dictionary with data
  Serial.print("{\"sensorValue\": ");
  Serial.print(sensorValue);
  Serial.print(", \"voltage\": ");
  Serial.print(voltage, 2); // Display voltage with 2 decimal places
  Serial.println("}");

  delay(1000); // Wait for a second (adjust as needed)
}`;
export const GetDefaultArduinoCode = (device: IDevice): string => {
  const data = device.sensor_data_labels;
  const defaultArduinoCode = `
const int analogPin = A0; // Analog pin where your sensor is connected

void setup() {
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  ${data
    .map(
      (item) =>
        `int ${item.field} = analogRead(analogPin);
  `
    )
    .join("")}

  // Create and send dictionary with data
  Serial.print("{");
  ${data
    .map(
      (item, index) => `
  Serial.print("\\"${item.field}\\": ");
  Serial.print(${item.field});
  ${index === data.length - 1 ? "" : 'Serial.print(", ");'}
      `
    )
    .join("")}
  Serial.println("}");

  delay(1000); // Wait for a second (adjust as needed)
}`;
  return defaultArduinoCode;
};

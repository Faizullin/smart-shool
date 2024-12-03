import { IFile } from "./IFile";
import { TimestampedModel } from "./TimestampedModel";

export interface IDeviceSensorData extends TimestampedModel {
  label_id: number;
  value: number;
}

export interface IDeviceSensorDataSubmit extends TimestampedModel {
  sensor_data_list: Array<IDeviceSensorData>
}

export interface IDeviceLabel {
  id: number;
  label: string;
  field: string;
}

export interface IDevice extends TimestampedModel {
  title: string;
  file: IFile;
  script: IFile;
  connection_status: "connected" | "failed" | "pending" | "not_connected";
  activated: boolean;
  sensor_data_labels?: Array<IDeviceLabel>;
}

import { IDeviceLabel, IDeviceSensorData } from "@/core/models/IDevice";
import React from "react";

export default function SensorDataContainer({
  label,
  lastItem,
}: {
  label: IDeviceLabel;
  lastItem: IDeviceSensorData;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{label.label}</h5>
        <p className="card-text">{lastItem && lastItem.value}</p>
      </div>
    </div>
  );
}

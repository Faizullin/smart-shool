import {
  IDevice,
  IDeviceSensorData,
  IDeviceSensorDataSubmit,
} from "@/core/models/IDevice";
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useEffectInitial from "@/core/hooks/useEffectInitial";
import { TimestampedModel } from "@/core/models/TimestampedModel";
import DeviceService from "@/core/services/DeviceService";

interface IDataItemStatsLabel extends TimestampedModel {
  label_id: number;
  label: string;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Data",
    },
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SensorDataStatsContainer({
  device,
  activated,
  lastSensorDataSubmitItem,
  sensorDataSubmitList,
}: {
  device: IDevice;
  activated: boolean;
  sensorDataSubmitList: IDeviceSensorDataSubmit[];
  lastSensorDataSubmitItem: IDeviceSensorDataSubmit | null;
}) {
  const [data, setData] = React.useState<IDeviceSensorDataSubmit[]>([]);
  const [titleLabels, setTitleLabels] = React.useState<IDataItemStatsLabel[]>(
    []
  );
  const [isInited, setIsInited] = React.useState<boolean>(false);

  const chartData = React.useMemo(() => {
    const new_datasets = [];
    const new_labels: string[] = data.map((item) => item.created_at);
    titleLabels.forEach((title_item) => {
      const data_values_list: number[] = [];
      data.forEach((submit_item) => {
        const required_data_item = submit_item.sensor_data_list.find(
          (item) => item.label_id === title_item.label_id
        );
        if (required_data_item !== undefined) {
          data_values_list.push(required_data_item.value);
        } else {
          data_values_list.push(null);
        }
      });
      new_datasets.push({
        label: title_item.label,
        data: data_values_list,
        borderColor: getRandomColor(),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      });
    });
    return {
      labels: new_labels,
      datasets: new_datasets,
    };
  }, [data, titleLabels]);
  useEffectInitial(() => {
    if (device && !isInited) {
      setTitleLabels(
        device.sensor_data_labels.map((item: any) => ({
          label_id: item.id,
          label: item.label,
        }))
      );
      setIsInited(true);
    }
  }, [device, isInited]);
  useEffect(() => {
    if (device && isInited) {
      setData(sensorDataSubmitList);
    }
  }, [device, isInited, sensorDataSubmitList]);
  return (
    <div>
      <div className="overflow-x-auto">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

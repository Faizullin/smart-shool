import { IDevice } from "@/core/models/IDevice";
import { ILoadingState } from "@/core/models/ILoadingState";
import { IProjectWork } from "@/core/models/IProjectWork";
import DeviceService from "@/core/services/DeviceService";
import InputLabel from "@/shared/components/InputLabel";
import SecondaryButton from "@/shared/components/buttons/secondary-button/SecondaryButton";
import InputError from "@/shared/components/form/InputError";
import TextInput from "@/shared/components/form/auth/TextInput";
import { AxiosError } from "axios";
import React, { FC, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

interface IJsonDataLabels {
  label: string;
  field: string;
}

interface IDeviceFormProps {
  projectWork: IProjectWork;
  onSuccess: any;
  device: IDevice;
}

const DeviceForm: FC<IDeviceFormProps> = ({
  onSuccess,
  projectWork,
  device,
}) => {
  const [data, setData] = useState<{
    sensor_data_labels: IJsonDataLabels[];
    script_id: number;
    title: string;
  }>({
    script_id: 0,
    title: "",
    sensor_data_labels: [
      {
        field: "temp",
        label: "Tempreature",
      },
    ],
  });
  const [errors, setErrors] = React.useState<any>({});
  const [loading, setLoading] = React.useState<ILoadingState>({
    detail: false,
    post: false,
  });
  const handleInputChange = (event: any) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };
  const handleLablelInputChange = (index, event) => {
    const sensor_data_labels = [...data.sensor_data_labels];
    sensor_data_labels[index][event.target.name] = event.target.value;
    setData((data) => ({
      ...data,
      sensor_data_labels,
    }));
  };
  const addField = () => {
    setData((data) => ({
      ...data,
      sensor_data_labels: [
        ...data.sensor_data_labels,
        {
          field: "",
          label: "",
        },
      ],
    }));
  };
  const removeField = (index) => {
    const sensor_data_labels = [...data.sensor_data_labels];
    sensor_data_labels.splice(index, 1);
    setData((data) => ({
      ...data,
      sensor_data_labels,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const submit_data = {
      title: data.title,
      script_id: data.script_id,
      sensor_data_labels: data.sensor_data_labels,
      practical_work_id: projectWork.id,
    };
    const fetchSubmit = async () => {
      setLoading((loading) => ({
        ...loading,
        post: true,
      }));
      try {
        if (device) {
          const response = await DeviceService.fetchUpdateProjectWorkDevice(
            device.id,
            submit_data
          );
          onSuccess(response.data);
        } else {
          const response = await DeviceService.fetchCreateProjectWorkDevice(
            submit_data
          );
          onSuccess(response.data);
        }
      } catch (error: AxiosError | any) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status == 400) {
            setErrors(error.response.data);
          }
        } else {
          console.error(error);
        }
      }
      setLoading((loading) => ({
        ...loading,
        post: false,
      }));
    };
    fetchSubmit();
  };
  const project_work_scripts = React.useMemo(() => {
    return projectWork.files.filter((item) => item.extension === ".cpp");
  }, [projectWork.files]);

  React.useEffect(() => {
    if (device) {
      setData((data) => ({
        ...data,
        script_id: device.script.id,
        title: device.title,
        sensor_data_labels: device.sensor_data_labels,
      }));
    }
  }, [device]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-2">
        <div className="col-6 form-group mb-2">
          <InputLabel htmlFor="title" value={"Title"} />
          <TextInput
            id="title"
            type="text"
            name="title"
            value={data.title}
            className="form-control"
            autoComplete="off"
            isFocused={true}
            onChange={handleInputChange}
          />
          <InputError message={errors.title} className="mt-2" />
        </div>
        <div className="col-6 form-group mb-2">
          <InputLabel
            htmlFor="password"
            value={<FormattedMessage id="script" defaultMessage="Script" />}
          />
          <Form.Select
            name="script_id"
            value={data.script_id}
            onChange={handleInputChange}
          >
            <option value={0}>---</option>
            {project_work_scripts.map((script) => (
              <option key={script.id} value={script.id}>
                {script.name}
              </option>
            ))}
          </Form.Select>
          <InputError message={errors.script_id} className="mt-2"></InputError>
        </div>
      </div>
      {!device ? (
        <div>
          <SecondaryButton className="btn-success mb-3" onClick={addField}>
            <FormattedMessage
              id="dashboard.projects_ad28992"
              defaultMessage="Add Variable"
            />
          </SecondaryButton>
          <div className="row mb-4">
            {data.sensor_data_labels.map((data_item, index) => (
              <div key={index} className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={`input-${index}-field`}>
                    <FormattedMessage
                      id="dashboard.projects_ui328992"
                      defaultMessage="Field name"
                    />
                  </Form.Label>
                  <Form.Control
                    id={`input-${index}-field`}
                    name="field"
                    value={data_item.field}
                    onChange={(e) => handleLablelInputChange(index, e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={`input-${index}-label`}>
                    <FormattedMessage id="label" defaultMessage="Label" />
                  </Form.Label>
                  <Form.Control
                    id={`input-${index}-label`}
                    name="label"
                    value={data_item.label}
                    onChange={(e) => handleLablelInputChange(index, e)}
                  />
                </Form.Group>
                <Button
                  onClick={() => removeField(index)}
                  className="btn-warning"
                >
                  <FormattedMessage id="remove" defaultMessage="Remove" />
                </Button>
              </div>
            ))}
          </div>
          {errors.sensor_data_labels && (
            <Alert variant="danger">
              {JSON.stringify(errors.sensor_data_labels)}
            </Alert>
          )}
        </div>
      ) : (
        <Alert variant="warning">
          <FormattedMessage
            id="dashboard.projects_waruu2"
            defaultMessage="To modify labels you should recreate new device"
          />
        </Alert>
      )}
      <Form.Text className="invalid-feedback d-block mb-3">
        {errors.detail}
      </Form.Text>
      <Button className="mt-3" type="submit" disabled={loading.post}>
        <FormattedMessage id="submit" />
      </Button>
    </form>
  );
};

export default DeviceForm;

import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { IConferenceChatMessage } from "@/core/models/IConference";
import {
  IDevice,
  IDeviceLabel,
  IDeviceSensorDataSubmit,
} from "@/core/models/IDevice";
import { IFile } from "@/core/models/IFile";
import { ILoadingState } from "@/core/models/ILoadingState";
import { IUserConnected } from "@/core/models/IWSConnectionData";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import {
  fetchProjectScriptDetail,
  fetchProjectScriptUpdate,
} from "@/core/redux/store/reducers/projectScriptSlice";
import AuthStorageService from "@/core/services/AuthStorageService";
import DeviceService from "@/core/services/DeviceService";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import SecondaryButton from "@/shared/components/buttons/secondary-button/SecondaryButton";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { AxiosError } from "axios";
import React, { FC, useCallback, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import ProjectLayout from "../../components/ProjectLayout";
import { GetDefaultArduinoCode } from "../../components/code-templates/DefaultArduinoCode";
import ChatFormContainer from "./components/ChatFormContainer";
import DeviceForm from "./components/DeviceForm";
import SensorDataContainer from "./components/SensorDataContainer";
import SensorDataStatsContainer from "./components/SensorDataStatsContainer";

interface IDashboardProjectBroadcastProps { }

const DashboardProjectBroadcast: FC<IDashboardProjectBroadcastProps> = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { projectData } = useAppSelector((state) => state.project);
  const navigate = useNavigate();
  const [isDeviceActivated, setIsDeviceActivated] =
    React.useState<boolean>(false);
  const [device, setDevice] = React.useState<IDevice | null>(null);
  const [lastSensorDataSubmitItem, setLastSensorDataSubmitItem] =
    React.useState<IDeviceSensorDataSubmit | null>(null);
  const [sensorDataSubmitList, setSensorDataSubmitList] = useState<
    IDeviceSensorDataSubmit[]
  >([]);
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<ILoadingState>({
    detail: false,
    post: false,
  });
  const ws = useRef<WebSocket | null>(null);
  const [usersConnected, setUsersConnected] = useState<IUserConnected[]>([]);
  const [messages, setMessages] = useState<IConferenceChatMessage[]>([]);
  const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null)
  const [showGeneratedApiKey, setShowGeneratedApiKey] = useState<boolean>(false)

  const fetchDevice = async (id: number) => {
    setLoading((loading) => ({
      ...loading,
      detail: true,
    }));
    try {
      const response = await DeviceService.fetchDetailProjectWorkDevice(id);
      setDevice(response.data);
      setIsDeviceActivated((response.data as any)?.activated ? true : false);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("Error:" + error.response.status);
      }
    }
    setLoading((loading) => ({
      ...loading,
      detail: false,
    }));
  };
  const saveCode = async (projectFile: IFile, value: string) => {
    await dispatch(
      fetchProjectScriptUpdate({
        project_id: projectData.id,
        file_id: projectFile.id,
        values: value,
      })
    );
    await dispatch(
      fetchProjectScriptDetail({
        project_id: projectData.id,
        file_id: projectFile.id,
      })
    );
  };
  const handleSuccessSubmit = (device_data: IDevice) => {
    setShowForm(false);
    setDevice(device_data);
    if (
      confirm(
        intl.formatMessage({
          id: "dashboard.projects_should_update1",
          defaultMessage: "Should update code?",
        })
      )
    ) {
      const new_code: string = GetDefaultArduinoCode(device_data);
      saveCode(device_data.script, new_code).then(() => {
        const to_url = `/dashboard/projects/${projectData.id}/edit`;
        navigate(to_url);
      });
    }
  };
  const handleEditDevice = async () => {
    setLoading((loading) => ({
      ...loading,
      detail: true,
    }));
    try {
      const response = await DeviceService.fetchDetailProjectWorkDevice(
        device.id
      );
      const device_data = response.data;
      setDevice(device_data);
      setShowForm(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data);
      }
    }
    setLoading((loading) => ({
      ...loading,
      detail: false,
    }));
  };
  const handleDeleteDevice = async () => {
    setLoading((loading) => ({
      ...loading,
      post: true,
    }));
    try {
      await DeviceService.fetchDeleteProjectWorkDevice(device.id);
      setIsDeviceActivated(false);
      setDevice(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("Error:" + error.response.status);
      }
    }
    setLoading((loading) => ({
      ...loading,
      post: false,
    }));
  };
  const handleToggleActivated = async (state: boolean) => {
    await DeviceService.fetchUpdateProjectWorkDevice(device.id, {
      activated: state,
    });
    await fetchDevice(device.id);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleRequestApiKey = useCallback(() => {
    if (!device) {
      return;
    }
    if (confirm("Generate new api key?")) {
      DeviceService.fetchGenerateApiKey(device.id).then(response => {
        if (response.data) {
          const key = response.data.key;
          setGeneratedApiKey(key)
          setShowGeneratedApiKey(true)
        }
      })
    }
  }, [device])

  React.useEffect(() => {
    if (projectData && projectData.device?.id) {
      fetchDevice(projectData.device.id);
    }
  }, [projectData]);
  React.useEffect(() => {
    if (device) {
      const fetchReadStreamData = async () => {
        try {
          const response = await DeviceService.fetchGetDeviceStreamData(
            device.id
          );
          const data_results = response.data.results;
          if (data_results.length > 0) {
            const item = response.data.results[0];
            setLastSensorDataSubmitItem(item);
          }
          setSensorDataSubmitList(data_results.reverse());
        } catch { }
      };
      fetchReadStreamData();
    }
  }, [device]);
  React.useEffect(() => {
    if (isDeviceActivated) {
      if (ws.current?.readyState === 1) {
        return;
      }
      const token = AuthStorageService.getCurrentAccessToken();
      const newWebsocket = new WebSocket(
        `${import.meta.env.VITE_APP_WS_BASE_URL}/ws/projects/broadcast/${device.id
        }/user/?token=${token}`
      );
      newWebsocket.onopen = () => {
        setLoading((loading) => ({
          ...loading,
          detail: false,
        }));
        newWebsocket.send(
          JSON.stringify({
            type: "new_user_joined",
            data: {
              user_full_name: user.username,
              token: token,
            },
          })
        );
      };
      newWebsocket.onmessage = (payload) => {
        const data = JSON.parse(payload.data);
        const fromUser: IUserConnected = data.from;
        const toUser: IUserConnected = data.data?.to;
        console.log("onmessage", data, fromUser, toUser);
        switch (data.type) {
          case "new_submit":
            const new_last_submit_item = data.data;
            setLastSensorDataSubmitItem(new_last_submit_item);
            setSensorDataSubmitList((sensorDataList) => {
              const tmp_list = [...sensorDataList];
              tmp_list.push(new_last_submit_item);
              return tmp_list;
            });
            break;
          case "new_user_joined":
            setUsersConnected(data.users_connected);
            break;
          case "send_command":
            setMessages((messages) => {
              const tmp_list = [...messages];
              tmp_list.unshift({
                author: data.from,
                content: data.data.command,
              });
              return tmp_list;
            });
            break;
          default:
            break;
        }
      };
      newWebsocket.onerror = (event) => { console.error(event) };
      newWebsocket.onclose = (event) => {
        if (event.code >= 4000) {
          dispatch(
            openModal({
              type: "error",
              data: {
                code: event.code,
                message: event.reason,
              },
            })
          );
        }
      };
      ws.current = newWebsocket;
    } else {
      if (ws.current) {
        ws.current.close();
      }
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [isDeviceActivated]);
  return (
    <ProjectLayout>
      <div className="h-100">
        <div className="d-flex flex-column ">
          <div className="card w-100 mb-2">
            <div className="card-header">
              <FormattedMessage id="device" defaultMessage="Device" />
            </div>
            <div className="card-body">
              {
                loading.detail ? <div>loading...</div> : (
                  <>

                    {device === null ? (
                      <PrimaryButton className="p-2" onClick={handleShowForm}>
                        <Icon path={mdiPlus} color="#ffffff" size={1} />
                        <FormattedMessage id="device" defaultMessage="Device" />
                      </PrimaryButton>
                    ) : (
                      <div>
                        <div className="d-flex">
                          <button
                            className="btn btn-info me-3 "
                            onClick={handleEditDevice}
                          >
                            <FormattedMessage id="edit" defaultMessage="Edit" />
                          </button>
                          <button
                            className="btn btn-danger me-3"
                            onClick={handleDeleteDevice}
                            disabled={loading.post}
                          >
                            <FormattedMessage id="delete" defaultMessage="Delete" />
                          </button>
                          {isDeviceActivated === true ? (
                            <button
                              className="btn btn-success me-3"
                              onClick={() => handleToggleActivated(false)}
                              disabled={loading.post}
                            >
                              <FormattedMessage
                                id="activated"
                                defaultMessage="Activated"
                              />
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning me-3"
                              onClick={() => handleToggleActivated(true)}
                              disabled={loading.post}
                            >
                              <FormattedMessage
                                id="not_activated"
                                defaultMessage="Not activated"
                              />
                            </button>
                          )}
                        </div>
                        <div className="row mt-2 ">
                          <div className="col-8 col-md-5">
                            <p>DEVICE_ID = {`${device.id}`}</p>
                            <SecondaryButton onClick={handleRequestApiKey}>Generate api key</SecondaryButton>
                            {/* <p>
                        PASSWORD ={" "}
                        <span onClick={handleEditDevice}>
                          {"*".repeat(device.password?.length || 5)}
                        </span>
                      </p> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              }
            </div>
          </div>
          {device && (
            <div className="card w-100">
              <div className="card-header">
                <FormattedMessage id="data" defaultMessage="Data" />{" "}
                {lastSensorDataSubmitItem?.updated_at}
              </div>
              <div className="card-body">
                <div className="row">
                  {device?.sensor_data_labels.map((label: IDeviceLabel) => (
                    <div key={label.id} className="col-9 col-md-6 col-lg-4">
                      <SensorDataContainer
                        label={label}
                        lastItem={
                          lastSensorDataSubmitItem?.sensor_data_list?.find(
                            (lastItemData) => label.id === lastItemData.label_id
                          ) || null
                        }
                      />
                    </div>
                  ))}
                  <div></div>
                </div>
              </div>
            </div>
          )}
          {device && (
            <div className="card w-100">
              <div className="card-header">
                <FormattedMessage id="dashboard.results_stats" />
              </div>
              <div className="card-body">
                <div className="row">
                  <SensorDataStatsContainer
                    device={device}
                    lastSensorDataSubmitItem={lastSensorDataSubmitItem}
                    sensorDataSubmitList={sensorDataSubmitList}
                    activated={isDeviceActivated}
                  />
                </div>
              </div>
            </div>
          )}
          {device && <ChatFormContainer ws={ws.current} messages={messages} />}
        </div>
        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage
                id="dashboard.projects_cuy223"
                defaultMessage="Device Form"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DeviceForm
              onSuccess={handleSuccessSubmit}
              projectWork={projectData}
              device={device}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm}>
              <FormattedMessage id="close" />
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showGeneratedApiKey} onHide={() => setShowGeneratedApiKey(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Api Key:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Copy:    {generatedApiKey}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowGeneratedApiKey(false)}>
              <FormattedMessage id="close" />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ProjectLayout>
  );
};

export default DashboardProjectBroadcast;

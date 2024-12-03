import { IConference, IConferenceChatMessage } from "@/core/models/IConference";
import { IUser } from "@/core/models/IUser";
import { IUserConnected } from "@/core/models/IWSConnectionData";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import { RootState } from "@/core/redux/store/store";
import AuthStorageService from "@/core/services/AuthStorageService";
import {
  mdiCamera,
  mdiCloseCircleOutline,
  mdiMessage,
  mdiMicrophone,
  mdiMicrophoneOff,
  mdiMonitor,
  mdiVideo,
  mdiVideoOff,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { Alert } from "react-bootstrap";
import { FormattedMessage, IntlShape } from "react-intl";
import { ConnectedProps, connect } from "react-redux";
import Peer from "simple-peer";
import ConferenceChatContainer from "./ConferenceChatContainer";
import VideoParticipant from "./VideoParticipant";
import "./conference-room-container.scss";

interface IUserPeerEstablished {
  user: IUserConnected;
  peer: Peer.Instance;
}

interface IStreamSettings {
  isVideoMuted: boolean;
  isAudioMuted: boolean;
  mainVideoId: string | null;
  isScreenSharing: boolean;
}

const mapState = (
  state: RootState,
  ownProps: {
    conference_payload: IConference;
    printFeedback: Function;
    user: IUser;
    onLeave: Function;
    intl: IntlShape;
    isMobile: boolean;
  }
) => ({
  ...ownProps,
});
const mapDispatch = { openModal };
const connector = connect(mapState, mapDispatch);
type IConferenceRoomContainerProps = ConnectedProps<typeof connector>;

class ConferenceRoomContainer extends React.Component<
  IConferenceRoomContainerProps,
  {
    stream: MediaStream;
    usersConnected: IUserConnected[];
    peersEstablished: IUserPeerEstablished[];
    currentUserStreamSettings: IStreamSettings;
    contentLoading: boolean;
    isSidebarOpen: boolean;
    isVideoRoomAccessible: boolean;
    chatData: {
      messages: IConferenceChatMessage[];
      last_message: IConferenceChatMessage;
    };
    current_user_data: IUserConnected;
  }
> {
  websocketRef: React.MutableRefObject<WebSocket>;
  constructor(props: IConferenceRoomContainerProps) {
    super(props);

    const current_user_data: IUserConnected = {
      user_id: props.user.id,
      user_full_name: props.user.username,
    };

    this.state = {
      stream: null,
      usersConnected: [],
      peersEstablished: [],

      currentUserStreamSettings: {
        isVideoMuted: false,
        isAudioMuted: false,
        mainVideoId: null,
        isScreenSharing: false,
      },
      contentLoading: true,
      isSidebarOpen: false,

      isVideoRoomAccessible: true,

      chatData: {
        messages: [],
        last_message: null,
      },

      current_user_data: current_user_data,
    };

    this.websocketRef = React.createRef();
  }
  muteVideo = () => {
    const stream = this.state.stream;
    if (!stream.getVideoTracks()[0]) return;
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    this.setState((state) => {
      const new_value = { ...state.currentUserStreamSettings };
      new_value.isVideoMuted = !stream.getVideoTracks()[0].enabled;
      return {
        currentUserStreamSettings: new_value,
      };
    });
  };
  muteAudio = () => {
    const stream = this.state.stream;
    if (!stream.getAudioTracks()[0]) return;
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    this.setState((state) => {
      const new_value = { ...state.currentUserStreamSettings };
      new_value.isAudioMuted = !stream.getAudioTracks()[0].enabled;
      return {
        currentUserStreamSettings: new_value,
      };
    });
  };
  leaveRoom = () => {
    this.props.onLeave();
  };
  createPeer = (
    currentUser: IUserConnected,
    otherUser: IUserConnected,
    currentUserStream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: currentUserStream,
    });

    peer.on("signal", (signal) => {
      this.websocketRef.current.send(
        JSON.stringify({
          type: "sending_offer",
          data: {
            from: currentUser,
            to: otherUser,
            offer: signal,
          },
        })
      );
    });
    return peer;
  };
  addPeer = (
    currentUser: IUserConnected,
    otherUser: IUserConnected,
    receivedOffer,
    currentUserStream: MediaStream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: currentUserStream,
    });
    peer.signal(receivedOffer);
    peer.on("signal", (signal) => {
      this.websocketRef.current.send(
        JSON.stringify({
          type: "sending_answer",
          data: {
            from: currentUser,
            to: otherUser,
            answer: signal,
          },
        })
      );
    });
    return peer;
  };
  sendSignalsToAll = (currentUser: IUserConnected, stream: MediaStream) => {
    const peers = [];
    this.state.usersConnected.forEach((otherUser) => {
      if (otherUser.user_id !== currentUser.user_id) {
        const peer = this.createPeer(currentUser, otherUser, stream);
        peers.push({
          user: otherUser,
          peer: peer,
        });
      }
    });
    this.setState({
      peersEstablished: peers,
    });
  };

  componentDidMount = () => {
    const { conference_payload, printFeedback, intl } = this.props;
    const { current_user_data } = this.state;
    if (
      this.websocketRef.current &&
      this.websocketRef.current?.readyState === 1
    ) {
      return;
    }

    if (!navigator.mediaDevices) {
      this.setState({ isVideoRoomAccessible: false });
      printFeedback({
        type: "error",
        feedbackMsg:
          "this video room is not accessible because the site is not running on secure protocol, i.e. 'HTTPS'",
      });
      return;
    }

    const token = AuthStorageService.getCurrentAccessToken();
    const websocket = new WebSocket(
      `${import.meta.env.VITE_APP_WS_BASE_URL}/ws/conference/${
        conference_payload.id
      }/?token=${token}`
    );
    this.websocketRef.current = websocket;
    websocket.onopen = () => {
      this.setState({
        contentLoading: true,
      });
      websocket.send(
        JSON.stringify({
          type: "new_user_joined",
          data: {
            from: current_user_data,
            token: localStorage.getItem("access_token"),
          },
        })
      );
    };
    websocket.onmessage = (payload) => {
      const data = JSON.parse(payload.data);
      const fromUser: IUserConnected = data.from;
      const toUser: IUserConnected = data.data?.to;
      console.log("onmessage", data, fromUser, toUser);

      switch (data.type) {
        case "new_user_joined":
          this.setState({
            usersConnected: data.users_connected,
          });
          if (current_user_data.user_id === fromUser.user_id) {
            navigator.mediaDevices
              .getUserMedia({
                video: true,
                audio: true,
              })
              .then((stream) => {
                this.setState({ stream: stream });
                this.sendSignalsToAll(current_user_data, stream);
              })
              .catch((error) => {
                this.setState({ isVideoRoomAccessible: false });
                printFeedback({
                  type: "error",
                  feedbackMsg:
                    "you need to enable media devices inorder to use access this room",
                });
                return;
              });
          } else {
            printFeedback({
              type: "success",
              feedbackMsg: `${fromUser.user_full_name} joined this room`,
            });
          }
          break;

        case "sending_offer":
          if (current_user_data.user_id === toUser.user_id) {
            const peer = this.addPeer(
              current_user_data,
              fromUser,
              data.data.offer,
              this.state.stream
            );
            this.setState(({ peersEstablished }) => {
              let newPeersList: IUserPeerEstablished[] = [
                ...peersEstablished,
                {
                  user: fromUser,
                  peer: peer,
                },
              ];

              const foundUserPeer = this.state.peersEstablished.find(
                (eachUser) => eachUser.user.user_id === fromUser.user_id
              );
              if (foundUserPeer) {
                const newList = peersEstablished.filter(
                  (peer) => foundUserPeer.user.user_id !== peer.user.user_id
                );
                newPeersList = [
                  ...newList,
                  {
                    user: fromUser,
                    peer: peer,
                  },
                ];
              }

              return {
                peersEstablished: newPeersList,
              };
            });
          }
          break;

        case "sending_answer":
          if (toUser.user_id === current_user_data.user_id) {
            const foundUserPeer = this.state.peersEstablished.find(
              (eachUser) => eachUser.user.user_id === fromUser.user_id
            );
            foundUserPeer.peer.signal(data.data.answer);
          }

          break;
        case "chat_message_new":
          this.setState((state) => {
            const new_last_message: IConferenceChatMessage = {
              author: fromUser,
              content: data.data.content,
            };
            const new_message_list = [...state.chatData.messages];
            new_message_list.push(new_last_message);
            return {
              chatData: {
                messages: new_message_list,
                last_message: new_last_message,
              },
            };
          });
          break;
        case "disconnected":
          if (fromUser.user_id !== current_user_data.user_id) {
            if (fromUser) {
              printFeedback({
                type: "error",
                feedbackMsg: `${fromUser.user_full_name} left`,
              });
              const foundUserPeer = this.state.peersEstablished.find(
                (eachUser) => eachUser.user.user_id === fromUser.user_id
              );
              if (foundUserPeer) {
                foundUserPeer.peer.destroy();
                const newPeersList = this.state.peersEstablished.filter(
                  (peer) => foundUserPeer.user.user_id !== peer.user.user_id
                );
                this.setState({ peersEstablished: newPeersList });
              }
            }
          }
          break;
        case "meeting_stop":
          printFeedback({
            type: "info",
            feedbackMsg: intl.formatMessage({
              id: "conference.alert_session_stpped",
            }),
          });
          this.leaveRoom();
          break;
        default:
          break;
      }
    };
    websocket.onclose = (event) => {
      if (event.code >= 4000) {
        this.props.openModal({
          type: "error",
          data: {
            code: event.code,
            message: event.reason,
          },
        });
      }
    };
  };
  componentWillUnmount = () => {
    const { peersEstablished, stream } = this.state;
    if (this.websocketRef.current) {
      this.websocketRef.current.close();
    }
    peersEstablished.forEach(({ peer }) => {
      peer.destroy();
    });
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    this.setState({
      stream: null,
      usersConnected: [],
      peersEstablished: [],
      currentUserStreamSettings: {
        isAudioMuted: false,
        isVideoMuted: false,
        mainVideoId: null,
        isScreenSharing: false,
      },
    });
  };
  getMedia = (screenShare: boolean = false) =>
    screenShare
      ? navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
      : navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
  handleScreenShare = () => {
    const { currentUserStreamSettings, current_user_data, peersEstablished } =
      this.state;
    const toggleScreenShare = async (useScreenShare: boolean) => {
      try {
        const newStream = await this.getMedia(useScreenShare);
        const newCurrentUserStreamSettings = { ...currentUserStreamSettings };
        peersEstablished.forEach((userPeerItem) => {
          userPeerItem.peer.addStream(newStream);
        });
        newCurrentUserStreamSettings.isScreenSharing = useScreenShare;
        this.setState({
          stream: newStream,
          currentUserStreamSettings: newCurrentUserStreamSettings,
        });
      } catch (error) {
        console.error("Error capturing screen:", error);
      }
    };
    toggleScreenShare(!currentUserStreamSettings.isScreenSharing);
  };
  handleOpenAsMain = (id: string) => {
    this.setState((state) => {
      const new_value = { ...state.currentUserStreamSettings };
      new_value.mainVideoId = id;
      return {
        currentUserStreamSettings: new_value,
      };
    });
  };
  handleMainDoubleClick = () => {
    const { currentUserStreamSettings } = this.state;
    if (currentUserStreamSettings.mainVideoId !== null) {
      this.setState((state) => {
        const new_value = { ...state.currentUserStreamSettings };
        new_value.mainVideoId = null;
        return {
          currentUserStreamSettings: new_value,
        };
      });
    }
  };
  handleToggleChatSidebar = () => {
    const { isMobile } = this.props;
    if (isMobile) {
      this.setState((state) => ({
        isSidebarOpen: !state.isSidebarOpen,
      }));
    }
  };
  private handleSendChatData = (event_type: string, data: any = {}) => {
    if (this.websocketRef.current?.readyState === 1) {
      this.websocketRef.current.send(
        JSON.stringify({
          type: event_type,
          data,
        })
      );
    }
  };
  handleSendMessage = (data: any) => {
    this.handleSendChatData("chat_message_new", data);
  };
  stopMeeting = () => {
    const { printFeedback, intl } = this.props;
    this.handleSendChatData("meeting_stop");
    printFeedback({
      type: "error",
      feedbackMsg: intl.formatMessage({
        id: "conference.alert_session_stpped",
      }),
    });
  };
  render() {
    const {
      isVideoRoomAccessible,
      currentUserStreamSettings,
      isSidebarOpen,
      peersEstablished,
      stream,
      chatData,
      current_user_data,
    } = this.state;
    const { conference_payload, isMobile } = this.props;

    return (
      <div className="conference-room-container row p-0 m-0">
        <div className="col-12 p-0 m-0">
          <div className="row p-0 m-0">
            <div className="col-12 col-lg-9 p-0 m-0">
              {isVideoRoomAccessible ? (
                <>
                  <div className="video-call-wrapper d-flex flex-wrap">
                    <VideoParticipant
                      isLocalUser={true}
                      stream={stream}
                      user={current_user_data}
                      onClick={() => this.handleOpenAsMain(`localUser`)}
                      onDoubleClick={this.handleMainDoubleClick}
                      className={
                        currentUserStreamSettings.mainVideoId === `localUser`
                          ? "main-video"
                          : ""
                      }
                    />
                    {peersEstablished.map((userPeer, index) => (
                      <VideoParticipant
                        key={index}
                        isLocalUser={false}
                        user={userPeer.user}
                        peer={userPeer.peer}
                        onClick={() =>
                          this.handleOpenAsMain(
                            `remote-${userPeer.user.user_id}`
                          )
                        }
                        onDoubleClick={this.handleMainDoubleClick}
                        className={
                          currentUserStreamSettings.mainVideoId ===
                          `remote-${userPeer.user.user_id}`
                            ? "main-video"
                            : ""
                        }
                      />
                    ))}
                  </div>
                  <div className="video-call-actions">
                    <button
                      className="video-action-button"
                      onClick={this.muteAudio}
                    >
                      {currentUserStreamSettings.isAudioMuted ? (
                        <Icon path={mdiMicrophoneOff} size={1} />
                      ) : (
                        <Icon path={mdiMicrophone} size={1} />
                      )}
                    </button>
                    <button
                      className="video-action-button"
                      onClick={this.muteVideo}
                    >
                      {currentUserStreamSettings.isVideoMuted ? (
                        <Icon path={mdiVideoOff} size={1} />
                      ) : (
                        <Icon path={mdiVideo} size={1} />
                      )}
                    </button>
                    <button
                      className="video-action-button px-4"
                      onClick={this.leaveRoom}
                    >
                      <FormattedMessage id="leave" />
                    </button>
                    <button
                      className="video-action-button"
                      onClick={this.handleScreenShare}
                    >
                      {currentUserStreamSettings.isScreenSharing ? (
                        <Icon path={mdiMonitor} size={1} />
                      ) : (
                        <Icon path={mdiCamera} size={1} />
                      )}
                    </button>
                    {current_user_data.user_id ===
                      conference_payload.admin.id && (
                      <button
                        className="video-action-button px-4"
                        onClick={this.stopMeeting}
                      >
                        <FormattedMessage id="conference.stop_meeting" />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <Alert variant="danger" className="mt-3">
                  This room is not accessible. Please make sure you enabled your
                  media devices.
                </Alert>
              )}
            </div>

            <button
              className={`btn-expand-chat-sidebar ${
                !isSidebarOpen ? "show" : ""
              }`}
              onClick={this.handleToggleChatSidebar}
            >
              <Icon path={mdiMessage} size={1} />
            </button>
            <div
              className={`chat-sidebar col-12 col-lg-3 p-0 ${
                isSidebarOpen ? "show" : ""
              }`}
            >
              <button
                className={`btn-close-chat-sidebar ${
                  isSidebarOpen ? "show" : ""
                }`}
                onClick={this.handleToggleChatSidebar}
              >
                <Icon path={mdiCloseCircleOutline} size={1} />
              </button>
              <ConferenceChatContainer
                user={current_user_data}
                chat_data={chatData}
                onSendMessage={this.handleSendMessage}
              />
            </div>
          </div>
          {/* <button
          className={`expand-btn ${!isSidebarOpen ? "show" : ""}`}
          type="button"
          onClick={this.handleToggleChatSidebar}
        >
          <Icon path={mdiMessage} size={1} />
        </button> */}
        </div>
      </div>
    );
  }
}

export default connector(ConferenceRoomContainer);

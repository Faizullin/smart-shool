import React from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConferenceDetail } from "@/core/redux/store/reducers/conferenceSlice";
import ConferenceService from "@/core/services/ConferenceService";
import { Button } from "react-bootstrap";
import { useToasts } from "react-bootstrap-toasts";
import { FormattedMessage, useIntl } from "react-intl";
import "./chat-room.scss";

const ConferencePrepare = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { conference_payload, loading } = useAppSelector(
    (state) => state.conference
  );
  const { user } = useAppSelector((state) => state.auth);
  const [videoStream, setVideoStream] = React.useState(null);
  const [audioStream, setAudioStream] = React.useState(null);
  const toasts = useToasts();
  const [ready, setReady] = React.useState<boolean>(false);
  const { id: item_id } = useParams();

  const startPreview = async () => {
    try {
      const constraints = {
        video: true,
        audio: true,
      };

      // Get access to the webcam and microphone
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Display the video preview
      setVideoStream(stream);

      // You can use the audio stream if needed
      // setAudioStream(stream.getAudioTracks()[0]);
    } catch (error) {
      console.error("Error accessing webcam or microphone:", error);
    }
  };

  const stopPreview = () => {
    // Stop the video preview
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    // Stop the audio preview if needed
    // if (audioStream) {
    //   audioStream.stop();
    // }

    setVideoStream(null);
    setAudioStream(null);
  };
  const handleJoin = () => {
    if (conference_payload?.status !== "completed") {
      navigate(`/conference/${item_id}/room`);
    } else {
      toasts.show({
        headerContent: "Bootstrap",
        bodyContent: intl.formatMessage({
          id: "conference.alert_session_stpped",
        }),
        toastProps: {
          bg: "info",
        },
      });
    }
  };

  React.useEffect(() => {
    if (item_id) {
      dispatch(fetchConferenceDetail(Number(item_id))).then((response) => {
        if (response.type === fetchConferenceDetail.fulfilled.toString()) {
          const conference_data = ConferenceService.getConferenceState();
          if (conference_data.ready) {
            if (conference_data?.id === (response.payload as any).id) {
              setReady(true);
            } else {
              setReady(false);
            }
          }
        } else if (
          response.type === fetchConferenceDetail.rejected.toString()
        ) {
          alert("You dont have permission to join");
        }
      });
    }
  }, [dispatch, item_id]);

  React.useEffect(() => {
    if (ready) {
      ConferenceService.setConferenceState({
        ...conference_payload,
        ready: true,
      });
    }
  }, [ready]);

  return (
    <main className="d-flex flex-column flex-grow-1">
      <section className="bg-green-light d-flex flex-column flex-grow-1">
        <div className="clients d-flex flex-column flex-grow-1">
          <div className="container d-flex flex-column flex-grow-1">
            <h3 className="mb-3">
              <FormattedMessage id="conference.prep_title" />
            </h3>
            <h3 className="mb-4">{conference_payload?.title}</h3>
            <div className="mb-3">
              {videoStream ? (
                // Display the video preview
                <video
                  className="w-100"
                  autoPlay
                  playsInline
                  ref={(video) => {
                    if (video) video.srcObject = videoStream;
                  }}
                />
              ) : (
                // Display a button to start the video preview
                <Button variant="primary" onClick={startPreview}>
                  <FormattedMessage id="conference.start_webcam_prview" />
                </Button>
              )}
            </div>
            <div className="mb-5 d-flex justify-content-between">
              <Button variant="secondary" onClick={stopPreview}>
                <FormattedMessage id="conference.stop_webcam_prview" />
              </Button>
              <Button variant="success" onClick={handleJoin}>
                <FormattedMessage id="join" />
              </Button>
            </div>
            <div>
              <p>{conference_payload?.description}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConferencePrepare;

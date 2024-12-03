import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import useIsMobile from "@/core/hooks/useIsMobile";
import { fetchConferenceDetail } from "@/core/redux/store/reducers/conferenceSlice";
import Loader from "@/shared/components/loader/Loader";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import React from "react";
import { useToasts } from "react-bootstrap-toasts";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import ConferenceRoomContainer from "./components/ConferenceRoomContainer";
import "./chat-room.scss";

export default function ConferenceRoom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { conference_payload, loading } = useAppSelector(
    (state) => state.conference
  );
  const { user } = useAppSelector((state) => state.auth);
  const toasts = useToasts();
  const { id: item_id } = useParams();
  const isMobile = useIsMobile({
    maxWidth: 900,
  });

  const printFeedback = (data: {
    type: "success" | "info" | "danger" | "error";
    feedbackMsg: string;
  }) => {
    console.log("printFeedback", data);
    const type = data.type === "error" ? "danger" : data.type;
    toasts.show({
      headerContent: "Bootstrap",
      bodyContent: data.feedbackMsg,
      toastProps: {
        bg: type,
      },
    });
  };

  const handleLeave = () => {
    navigate("/dashboard/conferences/");
  };

  React.useEffect(() => {
    if (item_id && !conference_payload) {
      dispatch(fetchConferenceDetail(Number(item_id)));
    }
    if (conference_payload && conference_payload.status === "completed") {
      printFeedback({
        type: "info",
        feedbackMsg: intl.formatMessage({
          id: "conference.alert_session_stpped",
        }),
      });
      const timeout = setTimeout(() => {
        navigate("/dashboard/conferences");
      }, 2000);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [dispatch, item_id, conference_payload]);

  return (
    <main className="conference-room-page flex-grow-1 bg-green-light">
      <TitleHelment title={intl.formatMessage({ id: "dashboard.Th4u/F" })} />
      <section className="clients w-100">
        <div className="container">
          {!loading.detail && conference_payload ? (
            <ConferenceRoomContainer
              conference_payload={conference_payload}
              printFeedback={printFeedback}
              user={user}
              onLeave={handleLeave}
              intl={intl}
              isMobile={isMobile}
            />
          ) : (
            <Loader active={true} />
          )}
        </div>
      </section>
    </main>
  );
}

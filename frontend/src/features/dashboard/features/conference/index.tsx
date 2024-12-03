import React from "react";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import { FormattedMessage, useIntl } from "react-intl";
import Table from "@/shared/components/table/Table";
import { IConference } from "@/core/models/IConference";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { fetchConferenceList } from "@/core/redux/store/reducers/conferenceSlice";
import { useNavigate } from "react-router-dom";
import ConferenceService from "@/core/services/ConferenceService";

export default function ConferenceIndex() {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { conferences } = useAppSelector((state) => state.conference);

  React.useEffect(() => {
    dispatch(fetchConferenceList({}));
  }, [dispatch]);

  const handleJoinClick = (item: IConference) => {
    navigate(`/conference/${item.id}/`);
  };
  const handleRestartAndJoinClick = async (item: IConference) => {
    try {
      await ConferenceService.fetchUpdateConference(item.id, {
        status: "planned",
      });
      navigate(`/conference/${item.id}/`);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        key: "id",
        title: "ID",
        render: (conference: any, key: string | number) => (
          <th
            key={key}
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {conference.id}
          </th>
        ),
      },
      {
        key: "admin",
        title: intl.formatMessage({
          id: "admin",
          defaultMessage: "Admin",
        }),
        render: (conference: IConference, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            {conference.admin?.username}
          </td>
        ),
      },
      {
        key: "planned_time",
        title: intl.formatMessage({
          id: "dashboard.conference_planned_time",
          defaultMessage: "Planned time",
        }),
      },
      {
        key: "actions",
        title: intl.formatMessage({
          id: "actions",
          defaultMessage: "Actions",
        }),
        render: (conference, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            {conference.status !== "completed" ? (
              <button
                type="button"
                onClick={() => handleJoinClick(conference)}
                className="btn btn-dark"
              >
                {conference.status === "ongoing" ? (
                  <FormattedMessage id="ongoing" defaultMessage="Ongoing" />
                ) : (
                  <FormattedMessage id="join" defaultMessage="Join" />
                )}
              </button>
            ) : (
              <p>{conference.status}</p>
            )}
            {conference.status === "completed" && conference.admin?.id === user.id && (
              <button
                type="button"
                onClick={() => handleRestartAndJoinClick(conference)}
                className="btn btn-dark"
              >
                <FormattedMessage id="restart" defaultMessage="Restart" />
              </button>
            )}
          </td>
        ),
      },
    ],
    []
  );
  return (
    <div className="row">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="overflow-x-auto">
              <Table<IConference> data={conferences} columns={columns} />
              {/* <PracticalSubmitModal exam_id={exam_id.current || ''} show={showPracticalSubmitForm} setShow={setShowPracticalSubmitForm} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

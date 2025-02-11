import { SessionRequest, SessionRequestStatus, Status } from "@/API";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar1Icon, Clock, DollarSign, MessageSquare } from "lucide-react";
import client from "@/lib/apiClient";
import { createSession, updateSessionRequest } from "@/graphql/mutations";
import { showToast } from "@/lib/toast";
import React, { useEffect } from "react";
import { UserCard } from "@/components/common/UserCard";
import { UserRole } from "types";
import { getUser } from "@/lib/dbActions";
import { DialogLoader } from "@/components/common/DialogLoader";

interface SessionRequestDetailsModalProps {
  sessionRequest: SessionRequest;
  children: React.ReactNode;
}

const SessionRequestDetailsModal = ({
  sessionRequest,
  children,
}: SessionRequestDetailsModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [initiatorData, setInitiatorData] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const onClose = () => {
    console.log("close");
    setOpen(false);
  };

  const onAccept = async (sessionRequest: SessionRequest) => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: updateSessionRequest,
        variables: {
          input: {
            id: sessionRequest.id,
            status: SessionRequestStatus.ACCEPTED,
          },
        },
      });

      if (data) {
        // create a new session

        const { data } = await client.graphql({
          query: createSession,
          variables: {
            input: {
              mentorID: sessionRequest.mentorID,
              menteeID: sessionRequest.menteeID,
              sessionRequestID: sessionRequest.id,
              sessionDate: sessionRequest.proposedSessionTime,
              duration: sessionRequest.duration,
              cost: sessionRequest.proposedCost,
              status: Status.SCHEDULED,
            },
          },
        });

        if (data) {
          showToast(
            "Session created successfully",
            "success",
            `Your session has been scheduled successfully for ${sessionRequest.proposedSessionTime}`
          );
        }
      }
    } catch (error) {
      showToast("Failed to accept session request", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const onReject = async (sessionRequest: SessionRequest) => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: updateSessionRequest,
        variables: {
          input: {
            id: sessionRequest.id,
            status: SessionRequestStatus.REJECTED,
          },
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      showToast("Failed to reject session request", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const getInitiatorData = async () => {
    try {
      setLoading(true);

      const initiatorRole = sessionRequest.initiatedBy as UserRole;
      const initiatorId =
        initiatorRole === "mentor"
          ? sessionRequest.mentorID
          : sessionRequest.menteeID;
      const data = await getUser(initiatorId, initiatorRole);
      if (!data) {
        throw new Error("User not found");
      }

      setInitiatorData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getInitiatorData();
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        {loading ? (
          <DialogLoader />
        ) : (
          <>
            <DialogHeader className="">
              <DialogTitle className="text-2xl">
                Session Request Details
              </DialogTitle>
              <DialogDescription>
                Review the session request details and take action
              </DialogDescription>
            </DialogHeader>
              <Card>
                <CardContent className="space-y-2 w-full">
                  <UserCard
                    otherUserData={initiatorData}
                    role={sessionRequest.initiatedBy as UserRole}
                  />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <Calendar1Icon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="text-sm text-gray-500">
                          Proposed Time
                        </span>
                        <p className="font-medium">
                          {sessionRequest.proposedSessionTime
                            ? new Date(
                                sessionRequest.proposedSessionTime
                              ).toLocaleString()
                            : "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <span className="text-sm text-gray-500">Duration</span>
                        <p className="font-medium">
                          {sessionRequest.duration} minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <span className="text-sm text-gray-500">Cost</span>
                        <p className="font-medium">
                          ${sessionRequest.proposedCost}
                        </p>
                      </div>
                    </div>

                    {sessionRequest.mentorNote && (
                      <div className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <span className="text-sm text-gray-500">
                            Mentor Note
                          </span>
                          <p className="text-sm mt-1">
                            {sessionRequest.mentorNote}
                          </p>
                        </div>
                      </div>
                    )}

                    {sessionRequest.menteeNote && (
                      <div className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <span className="text-sm text-gray-500">
                            Mentee Note
                          </span>
                          <p className="text-sm mt-1">
                            {sessionRequest.menteeNote}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            <DialogFooter className="gap-2 w-full">
              <Button
                className="w-full"
                onClick={() => onAccept(sessionRequest)}
              >
                Accept
              </Button>

              <Button
                className="w-full"
                variant="destructive"
                onClick={() => onReject(sessionRequest)}
              >
                Reject
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SessionRequestDetailsModal;

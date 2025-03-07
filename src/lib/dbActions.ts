import {
  listChatRooms,
  listMentees,
  listMentors,
  listReviews,
} from "@/graphql/queries";
import client from "./apiClient";
import {
  createChatRoom,
  createMentee,
  createMentor,
  updateMentee,
  updateMentor,
} from "@/graphql/mutations";
import { ProfileStatus } from "@/API";
import { UserRole } from "types";
type ROLE = "mentor" | "mentee";

interface IntiateChatRoom {
  mentorId: string;
  menteeId: string;
  mentorName: string;
  menteeName: string;
}

export const createUser = async (
  role: ROLE,
  email: string,
  userId: string,
  fcmToken?: string
) => {
  if (role === "mentor") {
    return await addMentor(email, userId, fcmToken);
  } else {
    return await addMentee(email, userId, fcmToken);
  }
};

export const getUser = async (
  userId: string,
  role: ROLE,
  fcmToken?: string
) => {
  if (role === "mentor") {
    return await findMentor(userId, fcmToken);
  } else {
    return await findMentee(userId, fcmToken);
  }
};

const addMentor = async (email: string, userId: string, fcmToken?: string) => {
  try {
    const mentorInput = fcmToken
      ? {
          email: email,
          mentorId: userId,
          profileStatus: ProfileStatus.PENDING,
          firebaseToken: fcmToken,
        }
      : {
          email: email,
          mentorId: userId,
          profileStatus: ProfileStatus.PENDING,
        };

    const { data, errors } = await client.graphql({
      query: createMentor,
      variables: {
        input: {
          ...mentorInput,
        },
      },
    });

    if (errors) {
      console.error(errors);
    }
    return data.createMentor;
  } catch (error) {
    console.error(error);
  }
};

const addMentee = async (email: string, userId: string, fcmToken?: string) => {
  try {
    const menteeInput = fcmToken
      ? {
          email: email,
          menteeId: userId,
          profileStatus: ProfileStatus.PENDING,
          firebaseToken: fcmToken,
        }
      : {
          email: email,
          menteeId: userId,
          profileStatus: ProfileStatus.PENDING,
        };

    const { data, errors } = await client.graphql({
      query: createMentee,
      variables: {
        input: {
          ...menteeInput,
        },
      },
    });

    if (errors) {
      console.error(errors);
    }
    return data.createMentee;
  } catch (error) {
    console.error(error);
  }
};

const findMentor = async (userId: string, fcmToken?: string) => {
  try {
    const { data, errors } = await client.graphql({
      query: listMentors,
      variables: {
        filter: {
          mentorId: {
            eq: userId,
          },
        },
      },
    });

    if (errors) {
      console.error(errors);
    }
    console.log(data);

    //if fcmToken is present we update the token
    if (fcmToken) {
      console.log("updating mentor token");
      const { data: updateData, errors: updateErrors } = await client.graphql({
        query: updateMentor,
        variables: {
          input: {
            id: data.listMentors.items[0].id,
            firebaseToken: fcmToken,
          },
        },
      });

      if (updateErrors) {
        console.error(updateErrors);
      }

      console.log("updateData", updateData);
      return updateData.updateMentor;
    }

    return data.listMentors.items[0];
  } catch (error) {
    console.error(error);
  }
};

const findMentee = async (userId: string, fcmToken?: string) => {
  try {
    const { data, errors } = await client.graphql({
      query: listMentees,
      variables: {
        filter: {
          menteeId: {
            eq: userId,
          },
        },
      },
    });

    if (errors) {
      console.error(errors);
    }
    console.log(data);

    //if fcmToken is present we update the token
    if (fcmToken) {
      console.log("updating mentee token");
      const { data: updateData, errors: updateErrors } = await client.graphql({
        query: updateMentee,
        variables: {
          input: {
            id: data.listMentees.items[0].id,
            firebaseToken: fcmToken,
          },
        },
      });

      

      if (updateErrors) {
        console.error(updateErrors);
      }

      console.log("updateData", updateData);
      return updateData.updateMentee;
    }
    return data.listMentees.items[0];
  } catch (error) {
    console.error(error);
  }
};

export const intiateChat = async ({
  mentorId,
  menteeId,
  mentorName,
  menteeName,
}: IntiateChatRoom) => {
  try {
    //bascially we run action when user clicks on chat button if there no chatrrrom between mentor and mentee we create one otherwise we just redirect to chatroom
    //we return chatroom id

    const { data, errors } = await client.graphql({
      query: listChatRooms,
      variables: {
        filter: {
          and: [
            {
              mentorID: {
                eq: mentorId,
              },
              menteeID: {
                eq: menteeId,
              },
            },
          ],
        },
      },
    });

    if (data.listChatRooms && data.listChatRooms.items.length > 0) {
      return data.listChatRooms.items[0].id;
    }
    // if chatroom does not exist we create one

    const { data: chatRoomData, errors: chatRoomErrors } = await client.graphql(
      {
        query: createChatRoom,
        variables: {
          input: {
            name: `${mentorName} - ${menteeName}`,
            mentorID: mentorId,
            menteeID: menteeId,
          },
        },
      }
    );

    if (chatRoomErrors) {
      console.error(chatRoomErrors);
    }

    return chatRoomData.createChatRoom.id;
  } catch (error) {
    console.error(error);
  }
};

export const getSessionReview = async (
  sessionID: string,
  userRole: UserRole
) => {
  try {
    const { data } = await client.graphql({
      query: listReviews,
      variables: {
        limit: 1,
        filter: {
          sessionID: {
            eq: sessionID,
          },
          reviewerRole: {
            eq: userRole,
          },
        },
      },
    });
    if (data.listReviews.items.length > 0) {
      return data.listReviews.items[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching reviews", error);
  }
};

//get reviews done on user
export const getUserReviews = async (userId: string) => {
  try {
    const { data } = await client.graphql({
      query: listReviews,
      variables: {
        filter: {
          reviewedID: {
            eq: userId,
          },
        },
      },
    });
    if (data.listReviews.items.length > 0) {
      return data.listReviews.items;
    }
    return [];
  } catch (error) {
    console.error("Error fetching reviews", error);
  }
};

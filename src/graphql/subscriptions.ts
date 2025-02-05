/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSessionRequest = /* GraphQL */ `subscription OnCreateSessionRequest(
  $filter: ModelSubscriptionSessionRequestFilterInput
) {
  onCreateSessionRequest(filter: $filter) {
    id
    sessionID
    proposedCost
    mentorNote
    menteeNote
    duration
    proposedSessionTime
    mentorID
    menteeID
    status
    initiatedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSessionRequestSubscriptionVariables,
  APITypes.OnCreateSessionRequestSubscription
>;
export const onUpdateSessionRequest = /* GraphQL */ `subscription OnUpdateSessionRequest(
  $filter: ModelSubscriptionSessionRequestFilterInput
) {
  onUpdateSessionRequest(filter: $filter) {
    id
    sessionID
    proposedCost
    mentorNote
    menteeNote
    duration
    proposedSessionTime
    mentorID
    menteeID
    status
    initiatedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSessionRequestSubscriptionVariables,
  APITypes.OnUpdateSessionRequestSubscription
>;
export const onDeleteSessionRequest = /* GraphQL */ `subscription OnDeleteSessionRequest(
  $filter: ModelSubscriptionSessionRequestFilterInput
) {
  onDeleteSessionRequest(filter: $filter) {
    id
    sessionID
    proposedCost
    mentorNote
    menteeNote
    duration
    proposedSessionTime
    mentorID
    menteeID
    status
    initiatedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSessionRequestSubscriptionVariables,
  APITypes.OnDeleteSessionRequestSubscription
>;
export const onCreateMessages = /* GraphQL */ `subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
  onCreateMessages(filter: $filter) {
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessagesSubscriptionVariables,
  APITypes.OnCreateMessagesSubscription
>;
export const onUpdateMessages = /* GraphQL */ `subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
  onUpdateMessages(filter: $filter) {
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessagesSubscriptionVariables,
  APITypes.OnUpdateMessagesSubscription
>;
export const onDeleteMessages = /* GraphQL */ `subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
  onDeleteMessages(filter: $filter) {
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMessagesSubscriptionVariables,
  APITypes.OnDeleteMessagesSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onCreateNotification(filter: $filter) {
    id
    mentorID
    menteeID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onUpdateNotification(filter: $filter) {
    id
    mentorID
    menteeID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onDeleteNotification(filter: $filter) {
    id
    mentorID
    menteeID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreateSession = /* GraphQL */ `subscription OnCreateSession($filter: ModelSubscriptionSessionFilterInput) {
  onCreateSession(filter: $filter) {
    id
    duration
    status
    sessionDate
    menteeID
    mentorID
    SessionRequests {
      nextToken
      __typename
    }
    cost
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSessionSubscriptionVariables,
  APITypes.OnCreateSessionSubscription
>;
export const onUpdateSession = /* GraphQL */ `subscription OnUpdateSession($filter: ModelSubscriptionSessionFilterInput) {
  onUpdateSession(filter: $filter) {
    id
    duration
    status
    sessionDate
    menteeID
    mentorID
    SessionRequests {
      nextToken
      __typename
    }
    cost
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSessionSubscriptionVariables,
  APITypes.OnUpdateSessionSubscription
>;
export const onDeleteSession = /* GraphQL */ `subscription OnDeleteSession($filter: ModelSubscriptionSessionFilterInput) {
  onDeleteSession(filter: $filter) {
    id
    duration
    status
    sessionDate
    menteeID
    mentorID
    SessionRequests {
      nextToken
      __typename
    }
    cost
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSessionSubscriptionVariables,
  APITypes.OnDeleteSessionSubscription
>;
export const onCreateMentor = /* GraphQL */ `subscription OnCreateMentor($filter: ModelSubscriptionMentorFilterInput) {
  onCreateMentor(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    expertise
    yearsOfExperience
    hourlyRate
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    mentorId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMentorSubscriptionVariables,
  APITypes.OnCreateMentorSubscription
>;
export const onUpdateMentor = /* GraphQL */ `subscription OnUpdateMentor($filter: ModelSubscriptionMentorFilterInput) {
  onUpdateMentor(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    expertise
    yearsOfExperience
    hourlyRate
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    mentorId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMentorSubscriptionVariables,
  APITypes.OnUpdateMentorSubscription
>;
export const onDeleteMentor = /* GraphQL */ `subscription OnDeleteMentor($filter: ModelSubscriptionMentorFilterInput) {
  onDeleteMentor(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    expertise
    yearsOfExperience
    hourlyRate
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    mentorId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMentorSubscriptionVariables,
  APITypes.OnDeleteMentorSubscription
>;
export const onCreateMentee = /* GraphQL */ `subscription OnCreateMentee($filter: ModelSubscriptionMenteeFilterInput) {
  onCreateMentee(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    goals
    preferredMentorExperience
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    menteeId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMenteeSubscriptionVariables,
  APITypes.OnCreateMenteeSubscription
>;
export const onUpdateMentee = /* GraphQL */ `subscription OnUpdateMentee($filter: ModelSubscriptionMenteeFilterInput) {
  onUpdateMentee(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    goals
    preferredMentorExperience
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    menteeId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMenteeSubscriptionVariables,
  APITypes.OnUpdateMenteeSubscription
>;
export const onDeleteMentee = /* GraphQL */ `subscription OnDeleteMentee($filter: ModelSubscriptionMenteeFilterInput) {
  onDeleteMentee(filter: $filter) {
    id
    firstName
    lastName
    email
    bio
    profilePictureUrl
    firebaseToken
    goals
    preferredMentorExperience
    Sessions {
      nextToken
      __typename
    }
    Notifications {
      nextToken
      __typename
    }
    profileStatus
    menteeId
    SessionRequests {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMenteeSubscriptionVariables,
  APITypes.OnDeleteMenteeSubscription
>;

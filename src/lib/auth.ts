import {
  signIn,
  signUp,
  confirmSignUp,
  resetPassword,
  signOut,
  getCurrentUser,
  autoSignIn,
} from "aws-amplify/auth";

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

// Sign up new user
export const handleSignUp = async ({
  username,
  password,
  email,
}: SignUpParams) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        autoSignIn: true,
        userAttributes: {
          email,
        },
      },
    });
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    throw error;
  }
};

// Confirm sign up with code
export const handleConfirmSignUp = async (username: string, code: string) => {
  try {
    const { nextStep, isSignUpComplete, userId } = await confirmSignUp({
      username,
      confirmationCode: code,
    });
    console.log("nextStep", nextStep, isSignUpComplete, userId);

    if (isSignUpComplete) {
      console.log("auto sign in");
      await autoSignIn();
    }
    return { nextStep, isSignUpComplete, userId };
  } catch (error) {
    throw error;
  }
};

// Sign in existing user
export const handleSignIn = async ({ username, password }: SignInParams) => {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username,
      password,
    });
    return { isSignedIn, nextStep };
  } catch (error) {
    throw error;
  }
};

// Send forgot password code
export const handleForgotPassword = async (username: string) => {
  try {
    await resetPassword({ username });
  } catch (error) {
    throw error;
  }
};

// Sign out user
export const handleSignOut = async () => {
  try {
    await signOut();
    localStorage.clear();
  } catch (error) {
    throw error;
  }
};

// Get current authenticated user
export const getCurrentAuthUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    throw error;
  }
};

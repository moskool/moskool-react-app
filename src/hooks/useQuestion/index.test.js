import React from "react";

import { renderHook } from "@testing-library/react-hooks";
import useQuestion from ".";
import Firebase from "components/shared/Firebase";
jest.mock("components/shared/Firebase"); // SoundPlayer is now a mock constructor

let useEffect;

const mockUseEffect = () => {
  useEffect.mockImplementationOnce((f) => f());
};

beforeAll(() => {
  // Clear all instances and calls to constructor and all methods:
  Firebase.mockImplementation(() => {
    return {
      getCollectionById: () => {
        return {
          onSnapshot: () => {
            "";
          },
        };
      },
    };
  });
});

/* mocking useEffect */
useEffect = jest.spyOn(React, "useEffect");

describe("the useQuestion hook", () => {
  beforeAll(() => {
    mockUseEffect();
  });
  it("should grab data from firebase db", () => {
    // mock.instances is available with automatic mocks:
    const firebase = new Firebase();
    const questionId = 1;
    const questionPath = "course";
    /* TODO return correct data */
    const mockReturn = { isLoading: true, isError: false, data: undefined };
    const { result, waitForNextUpdate } = renderHook(() =>
      useQuestion({ firebase, questionId, questionPath })
    );
    waitForNextUpdate();
    expect(result.current).toMatchObject(mockReturn);
    console.log(result.current);
  });
});

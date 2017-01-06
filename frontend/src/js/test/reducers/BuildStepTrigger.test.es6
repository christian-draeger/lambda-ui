/* globals describe it expect beforeEach afterEach */
import TriggerReducer from "../../main/reducers/BuildStepTrigger.es6";
import {OPEN_TRIGGER_DIALOG, CLOSE_TRIGGER_DIALOG} from "../../main/actions/BuildStepTriggerActions.es6";
import * as TestUtils from "../../test/testsupport/TestUtils.es6";

describe("BuildStepTrigger Reducer", () => {

    let realConsole;

    beforeEach(() => {
        TestUtils.consoleThrowingBefore(realConsole);
    });

    afterEach(() => {
        TestUtils.consoleThrowingAfter(realConsole);
    });

    describe("Close Trigger Dialog", () => {
        it("should change showTrigger by false", () => {
            const oldState = {showTrigger: true};

            const newState = TriggerReducer(oldState, {type: CLOSE_TRIGGER_DIALOG});

            expect(newState).toEqual({showTrigger: false});
        });
        it("should not change showTrigger if value is false", () => {
            const oldState = {showTrigger: false};

            const newState = TriggerReducer(oldState, {type: CLOSE_TRIGGER_DIALOG});

            expect(newState).toEqual(oldState);
        });
    });

    describe("Open Trigger Dialog", () => {
        it("should change showTrigger by true", () => {
            const oldState = {};

            const newState = TriggerReducer(oldState, {
                type: OPEN_TRIGGER_DIALOG,
                url: "url",
                parameter: [],
                triggerName: "name"
            });

            expect(newState).toEqual({showTrigger: true, url: "url", parameter: [], triggerName: "name"});
        });
    });

    it("should return old State f action type is invalid", () => {
        const oldState = {showTrigger: true};

        const newState = TriggerReducer(oldState, {type: "som_other_typ"});

        expect(oldState).toBe(newState);
    });

    describe("trigger step", () => {
        it("should add trigger step to empty state", () => {
            const oldState = {};

            const newState = TriggerReducer(oldState, {type: "triggerStep", buildId: 1, stepId: "1-2"});

            expect(newState).toEqual({triggeredSteps: {1: ["1-2"]}});
            expect(newState).not.toBe(oldState);
        });

        it("should append trigger step to previous state", () => {
            const oldState = {
                other: "key",
                triggeredSteps: {1: ["1", "2"]}
            };
            const expected = { other: "key",
                triggeredSteps: {1: ["1", "2", "1-2"]}};

            const newState = TriggerReducer(oldState, {type: "triggerStep", buildId: 1, stepId: "1-2"});

            expect(newState).toEqual(expected);
            expect(newState).not.toBe(oldState);
        });
    });
});
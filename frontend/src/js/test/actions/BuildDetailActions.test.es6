/* globals describe it expect */
import * as subject from "actions/BuildDetailActions.es6";

describe("BuildDetailActions", () => {
    it("should return toggleBuildDetails action object", () => {
        const newAction = subject.toggleBuildDetails(1);
        expect(newAction).toEqual({type: "toggleBuildDetails",
            buildId: 1});
    });

    it("should return addBuildDetails action object", () => {
        const newAction = subject.addBuildDetails(1, {});
        expect(newAction).toEqual({type: "addBuildDetails",
                                buildId: 1,
                                buildDetails: {}});
    });

    it("schould return viewBuildStep action object", () =>{
        const newAction = subject.viewBuildStep(1,2);
        expect(newAction).toEqual({type: "viewBuildStep",
                                buildId: 1,
                                stepId: 2});
    });

});
/* globals describe it expect */
import {StateIcon} from "StateIcon.es6";
import React from "react";

describe("State Icon", () => {
    it("should return div with success icon and hint", () => {
        const state = "success";
        const expected = <div className="buildIcon" title="Success"><i className="fa fa-check"/></div>;
        expect(StateIcon(state)).toEqual(expected);
    });

    it("should return div with failure icon and hint", () => {
        const state = "failure";
        const expected = <div className="buildIcon" title="Failure"><i className="fa fa-times"/></div>;
        expect(StateIcon(state)).toEqual(expected);
    });

    it("should return div with running icon and hint", () => {
        const state = "running";
        const expected = <div className="buildIcon" title="Running"><i className="fa fa-cog"/></div>;
        expect(StateIcon(state)).toEqual(expected);
    });

    it("should return div with killed icon and hint", () => {
        const state = "killed";
        const expected = <div className="buildIcon" title="Killed"><i className="fa fa-ban"/></div>;
        expect(StateIcon(state)).toEqual(expected);
    });

    it("should return div with default icon and without hint", () => {
        const state = "";
        const expected = <div className="buildIcon" title=""><i className="fa fa-ellipsis-h"/></div>;
        expect(StateIcon(state)).toEqual(expected);
    });


});
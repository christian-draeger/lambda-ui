/* globals describe it expect afterEach beforeEach */
import React from "react";
import {Header, HeaderLinks, mapStateToProps} from "../main/Header.es6";
import * as TestUtils from "../test/testsupport/TestUtils.es6";
import {shallow} from "enzyme";
import R from "ramda";
import "jasmine-expect-jsx";


describe("Header", () => {

    let realConsole;

    beforeEach(() => {
        TestUtils.consoleThrowingBefore(realConsole);
    });

    afterEach(() => {
        TestUtils.consoleThrowingAfter(realConsole);
    });

    const wrapDefaultValues = (input) => R.merge({showStartBuildButton: true}, input);

    describe("dark theme", () => {
        it("should use dark theme style", () => {
            const component = shallow(<Header pipelineName={"Test"} showStartBuildButton={true} darkTheme={true} links={[]}/>);
            expect(component.find(".appHeaderDark").length).toBe(1);
            expect(component.find(".appHeader").length).toBe(0);
        });

        it("should use default theme style", () => {
            const component = shallow(<Header pipelineName={"Test"} showStartBuildButton={false} links={[]}/>);
            expect(component.find(".appHeaderDark").length).toBe(0);
            expect(component.find(".appHeader").length).toBe(1);
        });
    });

    describe("start build button", () => {
        it("should show start build button", () => {
            const component = shallow(<Header pipelineName={"Test"} showStartBuildButton={true} links={[]}/>);
            expect(component.find(".runButton").length).toBe(1);
        });

        it("should hide start build button", () => {
            const component = shallow(<Header pipelineName={"Test"} showStartBuildButton={false} links={[]}/>);
            expect(component.find(".runButton").length).toBe(0);
        });
    });

    describe("Navbar Links", () => {
        it("should return one html link", () => {
            const component = HeaderLinks({links: [{url: "http://", text: "Link"}]});
            expect(component).toEqualJSX(<div className="linksHeader"><a className="link" target="_blank" key="headerlink-0"
                                                                      href="http://">Link</a></div>);
        });

        it("should return two html links", () => {
            const component = HeaderLinks({links: [{url: "http://", text: "Link1"}, {url: "https://", text: "Link2"}]});
            expect(component).toEqualJSX(<div className="linksHeader"><a className="link" target="_blank" key="headerlink-430"
                                                                      href="http://">Link1</a><a className="link" target="_blank"
                                                                                                 key="headerlink-1"
                                                                                                 href="https://">Link2</a>
            </div>);
        });


        it("should return null, when emty array in links available", () => {
            const component = HeaderLinks({links: []});
            expect(component).toEqual(null);
        });

        it("should return null, wenn no links in state available", () => {
            const component = HeaderLinks();
            expect(component).toEqual(null);
        });

        it("should set link target correct", () => {
            const component = HeaderLinks({links: [{url: "http://", text: "Link", target: "someTarget"}]});
            expect(component).toEqualJSX(<div className="linksHeader">
                {<a className="link" target="someTarget" key="http://"
                   href="http://">Link</a>}

            </div>);
        });

        it("should set link target to _blank if key does not exist", () => {
            const component = HeaderLinks({links: [{url: "http://", text: "Link"}]});
            expect(component).toEqualJSX(<div className="linksHeader"><a className="link" target="_blank" key="headerlink-0"
                                                                      href="http://">Link</a></div>);
        });

    });

    describe("Header redux", () => {
        it("should get config", () => {
            const state = {config: {name: "Pipeline", navbar: {links: [{url: "http...", name: "Name"}]}}};
            const expected = wrapDefaultValues({pipelineName: "Pipeline", links: [{url: "http...", name: "Name"}]});
            expect(mapStateToProps(state)).toEqual(expected);
        });

        it("should get emty array for links, when no links available", () => {
            const state = {config: {name: "Pipeline", navbar: {}}};
            const expected = wrapDefaultValues({pipelineName: "Pipeline", links: []});
            expect(mapStateToProps(state)).toEqual(expected);
        });

        it("should get emty array for links, when no navbar available", () => {
            const state = {config: {name: "Pipeline"}};
            const expected = wrapDefaultValues({pipelineName: "Pipeline", links: []});
            expect(mapStateToProps(state)).toEqual(expected);
        });
    });
});




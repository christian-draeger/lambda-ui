/* eslint-disable */
jest.mock("../Backend.es6");
import BuildDetailsRedux, {BuildDetails as subject, mapStateToProps} from '../BuildDetails.es6'
import {shallow, mount} from 'enzyme'
import {requestBuildDetails as requestBuildDetailsMock} from '../Backend.es6'
import {MockStore} from './TestSupport.es6'
import React from 'react';
import { Provider } from 'react-redux'


export const _it = () => {};

describe("BuildDetails Component", ()=>{
  const input = newAttributes => Object.assign({buildId: 1, open: true, details: undefined, requestDetailsFn: jest.fn()}, newAttributes)

  it("should display loading message if no details are in state", ()=>{
    const component = shallow(subject(input()));

    expect(component.text()).toEqual("Loading build details");
  });

  it("should request build details if no details are in the state", ()=> {
    const requestMockFn = jest.fn();

    shallow(subject(input({requestDetailsFn: requestMockFn})));

    expect(requestMockFn).toBeCalled();
  })

  it("should render all buildSteps on first level", ()=>{
    let steps = [{stepId: 1}, {stepId: 2}];
    let storeMock = MockStore({buildDetails: {1: {buildId: 1, steps: steps}}, openedBuilds: {1: true}})

    let component = mount(<Provider store={storeMock}><BuildDetailsRedux buildId="1"/></Provider>);

    expect(component.find("BuildStep").length).toEqual(2)
  })

  it("MapDispatchToProps should wire to backend.", ()=>{
    let store = MockStore({buildDetails: {}, openedBuilds: {2: true}});

    let provider = mount(<BuildDetailsRedux store={store} buildId="2"/>);

    expect(requestBuildDetailsMock).toBeCalled();
  })
})

describe("View Build details", ()=>{
  it("should map root steps if no view build details is given", () => {
    const state = {
      buildDetails: {
        1: {buildId: 1, steps: [{stepId: 1}, {stepId: 2}]}
      },
      openedBuilds: { 1: true}
    };
    const newProps = mapStateToProps(state, {buildId: 1});

    expect(newProps.stepsToDisplay).toEqual([{stepId: 1}, {stepId: 2}]);
  });

  it("should display steps of direct substep if viewBuildStep is set", () => {
    const state = {
      buildDetails: {
        1: {buildId: 1, steps: [{stepId: "1", steps: [
          {stepId: "1.1"}, {stepId: "1.2"}
        ]},
        {stepId: 2}
      ]}},
      openedBuilds: {1: true},
      viewBuildSteps: {1: "1"}
    }

    const newProps = mapStateToProps(state, {buildId: 1});

    expect(newProps.stepsToDisplay).toEqual([{stepId: "1.1"}, {stepId: "1.2"}]);
  });


})

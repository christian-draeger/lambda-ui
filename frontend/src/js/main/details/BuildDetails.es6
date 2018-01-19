import React, {PropTypes} from "react";
import {connect} from "react-redux";
import R from "ramda";
import BuildStep from "../steps/BuildStep.es6";
import App from "../App.es6";
import {makeDraggable, scrollToStep} from "../steps/HorizontalScroll.es6";
import QuickDetails from "../details/QuickDetails.es6";
import * as BuildStepActions from "../actions/BuildStepActions.es6";
import * as BuildDetailsActions from "../actions/BuildDetailActions.es6";
import "../../../sass/buildDetails.sass";

const updateScrollInfo = (component) => {
    const {showScrollInfoFn, showScrollInfo, buildId} = component.props;
    const dom = R.defaultTo({}, component.detailsDom);

    const shouldShowScrollInfo = dom.scrollWidth > dom.clientWidth;
    if (shouldShowScrollInfo !== showScrollInfo) {
        showScrollInfoFn(buildId, shouldShowScrollInfo);
    }
};

export class BuildDetails extends React.Component {

    constructor(props) {
        super(props);
        this.registeredEventHandler = false;
    }

    componentDidUpdate() {
        const {open, buildId, stepToScroll, noScrollToStepFn} = this.props;

        if (open && !this.registeredEventHandler) {
            if (makeDraggable(buildId)) {
                this.registeredEventHandler = true;
            }
        }
        if (!open) {
            this.registeredEventHandler = false;
        }

        updateScrollInfo(this);

        if (stepToScroll.updated) {
            scrollToStep(buildId, stepToScroll.step);
            noScrollToStepFn(buildId);
        }

    }

    render() {
        const {open, stepsToDisplay, buildId} = this.props;
        if (!open) {
            return null;
        }

        if (!stepsToDisplay) {
            const loadingMessage = "row loadingMessage" + App.darkTheme();
            return <div className="twelve columns buildDetails">
                <div className={loadingMessage}>Loading build details</div>
            </div>;
        }

        const quickDetails = <QuickDetails buildId={buildId}/>;

        /* eslint-disable no-return-assign */
        const buildDetails = "BuildDetails" + App.darkTheme();
        return <div className={buildDetails} id={"draggable" + buildId}>
            {quickDetails}
            <div ref={(detailsDom) => this.detailsDom = detailsDom} className="BuildDetailSteps">
                {R.map(step => <BuildStep key={step.stepId} step={step} buildId={buildId}/>)(stepsToDisplay)}
            </div>
        </div>;
    }
}

BuildDetails.propTypes = {
    buildId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    stepsToDisplay: PropTypes.array,
    stepToScroll: PropTypes.object,
    noScrollToStepFn: PropTypes.func.isRequired,
    openSubstepsFn: PropTypes.func.isRequired,
    buildDetails: PropTypes.object,
    showScrollInfoFn: PropTypes.func
};
export const mapStateToProps = (state, ownProps) => {
    const buildId = ownProps.buildId;
    const details = state.buildDetails[ownProps.buildId] || {};

    const stepsToDisplay = details.steps || null;
    const stepToScroll = R.pathOr({updated: false}, [buildId, "scrollToStep"])(state.showSubsteps);

    return {
        buildId: parseInt(ownProps.buildId),
        details: state.buildDetails[ownProps.buildId],
        stepsToDisplay: stepsToDisplay,
        open: state.openedBuilds[ownProps.buildId] || false,
        stepToScroll: stepToScroll,
        buildDetails: state.buildDetails[ownProps.buildId],
        showScrollInfo: R.path([ownProps.buildId, "showScrollInfo"], state.showSubsteps)
    };
};

export const mapDispatchToProps = (dispatch) => {

    return {
        noScrollToStepFn: (buildId) => dispatch(BuildDetailsActions.noScrollToStep(buildId)),
        openSubstepsFn: (buildId, stepId) => dispatch(BuildStepActions.openSubsteps(buildId, stepId)),
        showScrollInfoFn: (buildId, value) => dispatch(BuildDetailsActions.showScrollInfo(buildId, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildDetails);
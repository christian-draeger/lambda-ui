import React, {PropTypes} from "react";
import {connect} from "react-redux";
import "../../sass/footer.sass";
import R from "ramda";
import App from "./App.es6";

const Footer = ({lambdauiVersion, lambdacdVersion, showVersions}) => {
    if(!showVersions) {
        return null;
    }


    return <div className={"footer" + App.darkTheme()}>
        <div className="version-info">
            <div className={"version-info__link" + App.darkTheme()}><a href="https://github.com/sroidl/lambda-ui" target="_blank">LambdaUI: {lambdauiVersion}</a></div>
            <div className={"version-info__link" + App.darkTheme()}><a href="https://github.com/flosell/lambdacd" target="_blank">LambdaCD: {lambdacdVersion}</a></div>
        </div>
    </div>;

};


Footer.propTypes = {
    lambdauiVersion: PropTypes.string,
    lambdacdVersion: PropTypes.string,
    showVersions: PropTypes.bool
};

const mapStateToProps = (state) => {

    return {
        lambdauiVersion: R.path(["versions", "lambdauiVersion"])(state.config),
        lambdacdVersion: R.path(["versions", "lambdacdVersion"])(state.config),
        showVersions: true
    };
};

export default connect(mapStateToProps)(Footer);


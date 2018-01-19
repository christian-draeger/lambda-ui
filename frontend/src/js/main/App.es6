import {createLambdaUiStore as createStore} from "./AppState.es6";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import BuildSummaryList from "./BuildSummaryList.es6";
import Header from "./Header.es6";
import BuildStepDetailLayer from "./steps/BuildStepDetailLayer.es6";
import {Backend} from "./Backend.es6";
import {addConfiguration} from "./actions/ConfigActions.es6";
import TriggerDialog from "./steps/TriggerDialog.es6";
import {pollBuildDetails, pollSummaries} from "./Polling.es6";
import Footer from "./Footer.es6";

let backend;
let appStore;
let darkTheme;

export class LambdaUI {

    appStore() {
        return appStore;
    }

    backend() {
        return backend;
    }

    darkTheme() {
        return darkTheme;
    }

    startUp(config) {
        appStore = createStore();
        darkTheme = window.lambdaui.config.darkTheme ? "DarkTheme" : "";
        if (config) {
            appStore.dispatch(addConfiguration(config));
        }

        backend = new Backend(config.baseUrl);

        pollSummaries(backend, appStore);
        pollBuildDetails(backend, appStore);

        const rootElement = document.getElementById("entryPoint");
        ReactDOM.render(<Provider store={this.appStore()}>
            <div>
                <Header />
                <BuildSummaryList/>
                <BuildStepDetailLayer/>
                <TriggerDialog />
            </div>
        </Provider>, rootElement);

        const footer = document.getElementById("footer");
        ReactDOM.render(<Provider store={this.appStore()}>
            <Footer/>
            </Provider>, footer);

    }
}

export default new LambdaUI();

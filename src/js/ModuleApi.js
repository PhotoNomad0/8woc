//ModuleApi.js//

//node modules
const fs = require(window.__base + 'node_modules/fs-extra');

//user imports
const CheckStore = require('./stores/CheckStore.js');
const Dispatcher = require('./dispatchers/Dispatcher.js');

const React = require('react');
const ReactBootstrap = require('react-bootstrap');

const CUR_CHECK_KEY = "_currentCheck";
const CHECKS_KEY = "_checks";

class ModuleApi {
	constructor() {
        this.React = React;
        this.ReactBootstrap = ReactBootstrap;
        this.modules = {};
				this.actions = {
					changeCheck: "CHANGE_CHECK",
					changeCheckProperty: "CHANGE_CHECK_PROPERTY"
				};
				this.events = {
					changeCheck: "CHANGE_CHECK",
					changeCheckProperty: "CHANGE_CHECK_PROPERTY"
				}
	}

    saveModule(identifier, module) {
        this.modules[identifier] = module;
    }

    getModule(identifier) {
        if (identifier in this.modules) {
            return this.modules[identifier];
        }
        return null;
    }

    sendAction(action) {
        Dispatcher.handleAction(action);
    }

    registerAction(type, callback) {
        CheckStore.registerAction(type, callback);
    }

    removeAction(type, callback) {
        CheckStore.removeAction(type, callback);
    }

    registerEventListener(eventType, callback) {
        CheckStore.addEventListener(eventType, callback);
    }

    removeEventListener(eventType, callback) {
        CheckStore.removeEventListener(eventType, callback);
    }

    emitEvent(event, params) {
        CheckStore.emitEvent(event, params);
    }

    getDataFromCheckStore(field) {
        /* return a copy of the data from the check store so that even
         * if an evil developer tries to mutate the store directly it won't mutate
         */
        var obj = CheckStore.getModuleDataObject(field);
        if (obj != null && typeof obj == "object") {
            return Object.assign({}, obj);
        }
        return null;
    }

    getDataFromCommon(key) {
        /* return a copy of the data from check store rather than the data
         * itself so it can't be mutated directly
         */
        var commonObj = CheckStore.getFromCommon(key);
        if (commonObj != null && typeof commonObj == "object") {
            return Object.assign({}, commonObj);
        }
        //this should be obsolete
        var commonDataObject = CheckStore.getCommonDataObject();
        if (commonDataObject) {
            return commonDataObject[key];
        }
        return null;
    }

    putDataInCheckStore(field, key, value) {
        CheckStore.putInData(field, key, value);
    }

    putDataInCommon(key, value) {
        CheckStore.putInCommon(key, value);
    }

    inputJson(path, callback) {
        fs.readJson(path, callback);
    }

    outputJson(path, data, callback) {
        fs.outputJson(path, data, callback);
    }

    inputText(path, callback) {
        fs.readFile(path, callback);
    }

    outputText(path, string, callback) {
        fs.writeFile(path, string, callback);
    }

		debugStore(field, key) {
			if (field === undefined) {
				console.dir(CheckStore.storeData);
			}
			else if (key === undefined) {
				console.dir(CheckStore.getModuleDataObject(field));
			}
			else {
				console.dir(CheckStore.getModuleDataObject(field)[key]);
			}
		}

		getCurrentCheck() {
			return CheckStore.getFromCommon("_currentCheck");
		}

		// Extended API functions
		changeCurrentCheck(groupIndex, checkIndex) {
			let checks = CheckStore.getFromCommon(CHECKS_KEY);
			if (checks[groupIndex] && checks[groupIndex][checkIndex]) {
				CheckStore.putDataInCommon(CUR_CHECK_KEY, {
					chapter: checks[groupIndex][checkIndex].chapter,
					verse: checks[groupIndex][checkIndex].verse,
					groupIndex: groupIndex,
					checkIndex: checkIndex
				});
				return true;
			}
			else {
				return false;
			}
		}
}

const api = new ModuleApi();
module.exports = api;

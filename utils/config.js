import { readFile } from "node:fs";
import path from "path";

const CONFIG_FILE_NAME = "config.json";
const ACTIVITIES_KEY = "activities";
const EVENTS_KEY = "events";

class Activity {
    id;
    imgurl;
    title;
    link;
    constructor(imgurl, title, link, id) {
        this.imgurl = imgurl;
        this.title = title;
        this.link = link;
        this.id = id;
    }
}

class Event {
    title;
    description;
    imgurl;
    id;
    constructor(title, description, imgurl, id) {
        this.title = title;
        this.description = description;
        this.imgurl = imgurl;
        this.id = id;
    }
}

class ConfigManager {
    activites = [];
    events = [];
    constructor(parentDir) {
        this.confFPath = path.join(parentDir, CONFIG_FILE_NAME)
        readFile(this.confFPath, (err, json) => {
            if (err) throw err;
            const obj = JSON.parse(json);
            if (obj === null) {
                throw new Error("Config file is not a valid Json");
            }

            if (!Object.hasOwn(obj, ACTIVITIES_KEY)) {
                throw new Error("Config file does not contain activites field");
            }
            if (!Object.hasOwn(obj, EVENTS_KEY)) {
                throw new Error("Config file does not contain activites field");
            }

            this.activites = obj[ACTIVITIES_KEY].map(
                act => new Activity(act.imgurl, act.title, act.link, act.id)
            );
            this.events = obj[EVENTS_KEY].map(
                ev => new Event(ev.title, ev.description, ev.imgurl, ev.id)
            );
        })
    }

    //add method
    // delete method
    // update method
}

export default ConfigManager;

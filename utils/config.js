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

    // add method
    #add = (key, obj) => {
        if (key === ACTIVITIES_KEY) {
            this.activites.push(new Activity(obj.imgurl, obj.title, obj.link, obj.id));
        } else if (key === EVENTS_KEY) {
            this.events.push(new Event(obj.title, obj.description, obj.imgurl, obj.id));
        } else {
            throw new Error("Invalid key");
        }
    }

    /**
        * @param {{key: string, obj: Object}[]} insertList
    */
    insertAll(insertList) {
        insertList.forEach(entry => this.#add(entry.key, entry.obj));
        this.#save();
    }

    // save method
    #save = () => {
        const obj = {
            [ACTIVITIES_KEY]: this.activites,
            [EVENTS_KEY]: this.events
        }

        const json = JSON.stringify(obj);

        writeFile(this.confFPath, json, (err) => {
            if (err) throw err;
        })
    }

    // delete method
    #delete = (key, id) => {
        if (key === ACTIVITIES_KEY) {
            this.activites = this.activites.filter(act => act.id !== id);
        } else if (key === EVENTS_KEY) {
            this.events = this.events.filter(ev => ev.id !== id);
        } else {
            throw new Error("Invalid key");
        }
    }

    /** 
        * @param {{key: string, id: string}[]} deleteList
    */
    removeAll(deleteList) {
        deleteList.forEach(entry => this.#delete(entry.key, entry.id));
        this.#save();
    }

    // update method
    #update = (key, id, obj) => {
        if (key === ACTIVITIES_KEY) {
            this.activites = this.activites.map(act => {
                if (act.id === id) {
                    return new Activity(obj.imgurl, obj.title, obj.link, obj.id);
                }
                return act;
            });
        } else if (key === EVENTS_KEY) {
            this.events = this.events.map(ev => {
                if (ev.id === id) {
                    return new Event(obj.title, obj.description, obj.imgurl, obj.id);
                }
                return ev;
            });

        } else {
            throw new Error("Invalid key");
        }
    }

    /**
        * @param {{key: string, id: string, obj: Object}[]} updateList    
    */
    updateAll(updateList) {
        updateList.forEach(entry => this.#update(entry.key, this.entry.id, this.entry.obj));
        this.#save();
    }
}

const rootPath = path.dirname(".");
const config = new ConfigManager(rootPath);
export default config;

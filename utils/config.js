import { readFile, writeFile } from "node:fs";
import path from "path";

const CONFIG_FILE_NAME = "config.json";
const ACTIVITIES_KEY = "activities";
const EVENTS_KEY = "events";
const VIDEOS_KEY = "videos"
const apiKey = 'AIzaSyBB6WLCfIYho3cFYMEX4zBl-O98eLQv9z8';
const channelId = 'UCe25Cbiayb_IdByAsZV9xlA';
const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

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
  link;

  constructor(title, description, imgurl, id, link) {
    this.title = title;
    this.description = description;
    this.imgurl = imgurl;
    this.id = id;
    this.link = link;
  }
}


async function youtubeFetching() {
  // Replace the values below with your own API key and channel ID
  const apiKey = 'AIzaSyBB6WLCfIYho3cFYMEX4zBl-O98eLQv9z8';
  const channelId = 'UCe25Cbiayb_IdByAsZV9xlA';

  // Define the API endpoint to fetch videos from the channel
  const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    const videos = data.items;
    return videos;
  } catch (error) {
    throw new Error(`Failed to fetch videos: ${error}`);
  }
}

async function fetchVideos() {
  try {
    const videos = await youtubeFetching();
    return videos;
  } catch (error) {
    console.error("Failed to fetch videos: ", error);
  }
}


class ConfigManager {
  activites = [];
  events = [];
  videos = [];

  constructor(parentDir) {
    this.confFPath = path.join(parentDir, CONFIG_FILE_NAME)
    let videosFetchFromYt = true;
    readFile(this.confFPath, async (err, json) => {
      if (err) throw err;

      const obj = JSON.parse(json.toString());
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

      this.videos = await fetchVideos();
      this.videos.map(video => {
        let videoId = video.id.videoId;
        let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        let videoTitle = video.snippet.title;
        let videoDescription = video.snippet.description;
        let videoThumbnail = video.snippet.thumbnails.default.url;
        let videoObject = {
          title: videoTitle,
          description: videoDescription,
          imgurl: videoThumbnail,
          id: videoId,
          link: videoUrl
        }
        new Event(videoObject.title, videoObject.description, videoObject.imgurl, videoObject.id, videoObject.link);
      }
      )
      if (this.videos.length <= 0) {
        videosFetchFromYt = false
        this.videos = obj[VIDEOS_KEY]
        console.log("Failed to fetch videos from youtube. Using local cache....")
      }else {
        this.#save();
        console.log("Caching youtube videos data....")
      }
    })
  }

  // add method
  #add(key, obj) {
    if (key === ACTIVITIES_KEY) {
      this.activites.push(new Activity(obj.imgurl, obj.title, obj.link, obj.id));
    } else if (key === EVENTS_KEY) {
      this.events.push(new Event(obj.title, obj.description, obj.imgurl, obj.id, obj.link));
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
  #save() {
    const obj = {
      [ACTIVITIES_KEY]: this.activites,
      [EVENTS_KEY]: this.events,
      [VIDEOS_KEY]: this.videos
    }

    const json = JSON.stringify(obj);

    writeFile(this.confFPath, json, (err) => {
      if (err) throw err;
    })
  }

  // delete method
  #delete(key, id) {
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
  #update(key, id, obj) {
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
          return new Event(obj.title, obj.description, obj.imgurl, obj.id, obj.link);
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



const configManager = new ConfigManager(path.dirname(".."));
export { ConfigManager, configManager };

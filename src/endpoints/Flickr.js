import axios from 'axios';

const endpoint = "api.flickr.com";
const methods = {
    photosets: "flickr.photosets.getList",
    photos: "flickr.photosets.getPhotos",
    comments: "flickr.photos.comments.getList",
    info: "flickr.photos.getInfo"
};
const apiKey = "6e8a597cb502b7b95dbd46a46e25db8d";

const buildUrl = (method, params) => {
    url = `https://${endpoint}/services/rest/?method=${method}&api_key=${apiKey}`;
    Object.entries(params).forEach( ([key, value]) => {
        url += `&${key}=${value}`;
    })
    console.log(url);
    return url;
};

const getPhotoSet = async (userId) => {
    let ok = true;
    let response = null;
    params = {
        user_id: userId,
        format: "json",
        nojsoncallback: 1
    };
    try {
        const { data } = await axios.get(buildUrl(methods.photosets, params));
        if(data.status === "failed") {
            ok = false;
            response = data;
        }
        else {
            response = data.photosets.photoset;
        }
    }
    catch(err) {
        ok = false;
        response = err;
    }
    return {status: ok, response: response};
};

const getPhotos = async (userId, photoSetId) => {
    let ok = true;
    let response = null;
    params = {
        user_id: userId,
        photoset_id: photoSetId,
        format: "json",
        nojsoncallback: 1
    };
    try {
        const { data } = await axios.get(buildUrl(methods.photos, params));
        if(data.status === "failed") {
            ok = false;
            response = data;
        }
        else {
            response = data.photoset.photo;
        }
    }
    catch(err) {
        ok = false;
        response = err;
    }
    return {status: ok, response: response};
};

const getComments = async (photoId) => {
    let ok = true;
    let response = null;
    params = {
        photo_id: photoId,
        format: "json",
        nojsoncallback: 1
    };
    try {
        const { data } = await axios.get(buildUrl(methods.comments, params));
        if(data.status === "failed") {
            ok = false;
            response = data;
        }
        else {
            response = data.comments.comment;
        }
    }
    catch(err) {
        ok = false;
        response = err;
    }
    return {status: ok, response: response};
};

const getInfo = async (photoId) => {
    let ok = true;
    let response = null;
    params = {
        photo_id: photoId,
        format: "json",
        nojsoncallback: 1
    };
    try {
        const { data } = await axios.get(buildUrl(methods.info, params));
        if(data.status === "failed") {
            ok = false;
            response = data;
        }
        else {
            response = data.photo.dates.posted * 1000;
        }
    }
    catch(err) {
        ok = false;
        response = err;
    }
    return {status: ok, response: response};
};

export { getPhotoSet, getPhotos, getComments, getInfo };
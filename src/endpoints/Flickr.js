import axios from 'axios';

const endpoint = "api.flickr.com";
const methods = {
    photosets: "flickr.photosets.getList",
    photos: "flickr.photosets.getPhotos",
    comments: "flickr.photos.comments.getList"
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
    params = {
        user_id: userId,
        format: "json",
        nojsoncallback: 1
    };
    try {
        const { data } = await axios.get(buildUrl(methods.photosets, params));
        return data.photosets.photoset;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

const getPhotos = async (userId, photoSetId) => {
    params = {
        user_id: userId,
        photoset_id: photoSetId,
        format: "json",
        nojsoncallback: 1
    }
    try {
        const { data } = await axios.get(buildUrl(methods.photos, params));
        return data.photoset.photo;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

const getComments = async (photoId) => {
    params = {
        photo_id: photoId,
        format: "json",
        nojsoncallback: 1
    }
    try {
        const { data } = await axios.get(buildUrl(methods.comments, params));
        return data.comments.comment;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

export { getPhotoSet, getPhotos, getComments };
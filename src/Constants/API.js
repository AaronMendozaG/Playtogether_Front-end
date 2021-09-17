// const API_URL = "https://playtogether-backend.pykode.xyz/api/";
// const API_URL = "http://localhost:8000/api/";
const API_URL = "https://playtogether-v2.pykode.xyz/api/";

// const photoAPI = "https://django-playtogether-media.s3.us-east-2.amazonaws.com/"
// const BACKGROUNDS_URL = "https://django-playtogether-media.s3.us-east-2.amazonaws.com/assets/images/bg/"
// const imgField = "https://django-playtogether-media.s3.us-east-2.amazonaws.com/field"
// const ICONS_URL = "https://django-playtogether-media.s3.us-east-2.amazonaws.com/assets/icons/"
// const IMAGES_URL = "https://django-playtogether-media.s3.us-east-2.amazonaws.com/assets/images/"

const photoAPI = "https://pt-media-s3.s3.us-east-2.amazonaws.com/"
const BACKGROUNDS_URL = "https://pt-media-s3.s3.us-east-2.amazonaws.com/assets/images/bg/"
const imgField = "https://pt-media-s3.s3.us-east-2.amazonaws.com/field"
const ICONS_URL = "https://pt-media-s3.s3.us-east-2.amazonaws.com/assets/icons/"
const IMAGES_URL = "https://pt-media-s3.s3.us-east-2.amazonaws.com/assets/images/"

// const photoAPI = "https://s3.us-east-2.amazonaws.com/playtogether.v2/"
// const BACKGROUNDS_URL = "https://s3.us-east-2.amazonaws.com/playtogether.v2/assets/images/bg/"
// const imgField = "https://s3.us-east-2.amazonaws.com/playtogether.v2/field"
// const ICONS_URL = "https://s3.us-east-2.amazonaws.com/playtogether.v2/assets/icons/"
// const IMAGES_URL = "https://s3.us-east-2.amazonaws.com/playtogether.v2/assets/images/"

const AUTH_TOKEN = localStorage.getItem("token");
const AUTH_ID = localStorage.getItem("id")
const AUTH_STAFF = JSON.parse(localStorage.getItem("staff"))
const AUTH_PHOTO = localStorage.getItem("player_photo")
const isAuthenticated = localStorage.getItem("token");
export {API_URL, photoAPI,AUTH_TOKEN,AUTH_ID,imgField, ICONS_URL, AUTH_PHOTO,isAuthenticated,BACKGROUNDS_URL, IMAGES_URL, AUTH_STAFF}

import {generatePhotos} from './photo.js';
import {renderThumbnails} from './render-thumbnails.js';
//eslint-disable-next-line no-unused-vars
const photos = generatePhotos();

renderThumbnails(photos);

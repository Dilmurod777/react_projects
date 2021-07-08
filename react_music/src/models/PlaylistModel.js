export default class PlaylistModel {
  constructor(type, image, title, showLikes, likes=0) {
    this.type = type;
    this.image = image;
    this.title = title;
    this.showLikes = showLikes;
    this.likes = likes;
  }
}

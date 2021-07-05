class PostModel{
  constructor(title, body, author, id) {
    this.title = title;
    this.body = body;
    this.author = author;
    this.id = id;
  }

  static fromJson(json) {
    return new PostModel(
      json['title'],
      json['body'],
      json['author'],
      json['id']);
  }
}

export default PostModel;

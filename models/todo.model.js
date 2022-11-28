export class Todo {
  constructor(
    id,
    creator,
    title,
    message,
    tags,
    image,
    likeCount,
    publicationDate
  ) {
    this.id = id;
    this.creator = creator;
    this.title = title;
    this.message = message;
    this.tags = tags;
    this.image = image;
    this.likeCount = likeCount;
    this.publicationDate = publicationDate;
  }
}

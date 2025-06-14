import List from '../models/listModel.js';

class MoviesHandler {
  static async createList({ name, tags, description, titles, images, userId }) {
    const newList = await List.create({
      name,
      tags,
      description,
      titles,
      images,
      userId,
    });

    return newList;
  }

}

export default MoviesHandler;

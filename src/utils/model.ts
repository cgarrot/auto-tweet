export class Model<T> {
  constructor(entity: T) {
    Object.assign(this, entity);
  }
}

import BaseRepository from "@shared/base/base-repository";
import { Category } from "./category-entity";

export default class CategoryRepository extends BaseRepository<Category> {
    constructor() {
        super(Category);
    }
}

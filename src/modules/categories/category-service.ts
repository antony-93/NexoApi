import { ServiceResult } from "@shared/types/service-result";
import { Category } from "./category-entity";
import CategoryRepository from "./category-repository";
import { CreateCategoryDto } from "./dto/create-category-dto";
import { fail, ok } from "@shared/helpers/service-result";

export default class CategoryService {
    constructor(private _categoryRepo = new CategoryRepository()) { }

    async create(data: CreateCategoryDto): Promise<ServiceResult<{ id: string }>> {
        const category = new Category();

        category.description = data.description;

        const result = await this._categoryRepo.save(category);

        return ok({ id: result.id }, 'Categoria criada com sucesso!');
    }

    async list(): Promise<ServiceResult<Category[]>> {
        const categories = await this._categoryRepo.list();
        return ok(categories, 'Categoria listada com sucesso!');
    }
}
import { Repository, EntityTarget, FindOptionsWhere } from "typeorm";
import AppDataSource from "@infra/database/db";
import BaseEntity from "./base-entity";

export default abstract class BaseRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(protected entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository<T>(entity);
  }

  list() {
    return this.repository.find();
  }

  findById(id: BaseEntity['id']) {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  save(data: T) {
    return this.repository.save(data);
  }
  
  saveMultiple(data: T[]) {
    return this.repository.save(data);
  }
}

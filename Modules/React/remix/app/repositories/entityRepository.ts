import { getPagination } from "app/utils/paginations/paginationUtils";
import { DatabaseParameter } from "app/utils/parameters/parameterUtils";
import { dataSource } from "database/dataSource/dataSource";
import { DataSource, Repository, Entity, EntityTarget } from 'typeorm';

export abstract class EntityRepository {
  repository: Repository<typeof Entity>;
  dataSource: DataSource;

  async initialize() {
    const dataSource = this.getDataSource();

    if (!dataSource.isInitialized) {
      await dataSource.initialize();

      this.repository = this.getRepository();
      this.dataSource = dataSource;
    }
  }

  async destroy() {
    await this.getDataSource().destroy()
  }

  async getWithParameter(databaseParameter: DatabaseParameter) {
    const [data, total] = await this.getRepository().findAndCount(databaseParameter)

    return {
      data: data,
      total: total
    }
  }

  async getWithPagination({
    url,
    databaseParameter
  }: {
    url: string,
    databaseParameter: DatabaseParameter
  }) {
    const res = await this.getWithParameter(databaseParameter);

    return getPagination({
      url: url,
      parameter: databaseParameter,
      data: res.data,
      total: res.total
    })
  }

  getDataSource(): DataSource {
    return this.dataSource ?? dataSource;
  }

  getRepository(): Repository<typeof Entity> {
    return this.repository ?? dataSource.getRepository(this.getEntity())
  }

  abstract getEntity(): EntityTarget<typeof Entity>
}
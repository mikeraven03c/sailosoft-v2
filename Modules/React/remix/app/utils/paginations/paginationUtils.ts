import { databaseConfig } from "app/configs/databaseConfig";
import {
  DatabasePageParameter,
  DatabaseParameter,
  parameterToInt,
} from "../parameters/parameterUtils";
import { EntityOptions } from "typeorm";

export interface PageParameter {
  page: number;
  perPage: number;
}

function getPageParameter({
  page,
  perPage,
}: PageParameter): DatabasePageParameter {
  const skip = ((page > 1 ? page : 1) - 1) * perPage;

  const databasePageParameter: DatabasePageParameter = {
    skip,
    take: perPage,
    page: page
  };

  return databasePageParameter;
}

export function resolvePageParameter({
  requestUrl,
}: {
  requestUrl: URL;
}): DatabasePageParameter {
  const pageInput = {
    page: parameterToInt(requestUrl, "page"),
    perPage: parameterToInt(requestUrl, "perPage"),
  };

  return getPageParameter({
    page: pageInput.page ? pageInput.page : 1,
    perPage: pageInput.perPage
      ? pageInput.perPage
      : databaseConfig.pagination.perPage,
  });
}


export function getPagination({ url, parameter, data, total }: {
  url: string,
  parameter: DatabaseParameter,
  data: {
    (options?: EntityOptions): ClassDecorator;
    (name?: string, options?: EntityOptions): ClassDecorator;
  }[],
  total: number
}) {
  const page = parameter.page;
  const perPage = parameter.take;
  const baseUrl = url.split('?')[0];

  const from = (parameter.page - 1) * parameter.take + 1;

  const to = Math.min(from + parameter.take - 1, total);

  const totalPages = Math.ceil(total / parameter.take);

  const nextPageUrl = parameter.page < totalPages ? `${baseUrl}?page=${page + 1}&perPage=${perPage}` : null;
  const prevPageUrl = page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
  const lastPageUrl = `${baseUrl}?page=${totalPages}&perPage=${perPage}`;
  const firstPageUrl = `${baseUrl}?page=1&perPage=${perPage}`;

  const last = Math.ceil(total / perPage)

  const mappedData = data.map(e => {
    return {
      id: e['id'],
      ...e['data']
    };
  })

  return {
    data: mappedData,
    from,
    to,
    last,
    perPage,
    next_page_url: nextPageUrl,
    prev_page_url: prevPageUrl,
    last_page_url: lastPageUrl,
    totalPages: totalPages,
    currentPage: parameter.page,
    first_page_url: firstPageUrl,
    path: baseUrl,
  }
}


// import { EntityRepository, Repository } from 'typeorm';
// import { User } from './User.entity';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//     async findAll(url: string, page: number = 1, perPage: number = 10): Promise<{ data: User[]; currentPage: number; perPage: number; total: number; totalPages: number; from: number; to: number; nextPageUrl: string; lastPageUrl: string; prevPageUrl: string; lastPage: number }> {
//         const baseUrl = url.split('?')[0];

//         const [results, total] = await this.findAndCount({
//             skip: (page - 1) * perPage,
//             take: perPage,
//         });

//         const from = (page - 1) * perPage + 1;
//         const to = Math.min(from + perPage - 1, total);

//         const nextPageUrl = page < totalPages ? `${baseUrl}?page=${page + 1}&perPage=${perPage}` : null;
//         const prevPageUrl = page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
//         const lastPageUrl = `${baseUrl}?page=${totalPages}&perPage=${perPage}`;

//         return {
//             data: results,
//             currentPage: page,
//             perPage,
//             total,
//             totalPages: Math.ceil(total / perPage),
//             from,
//             to,
//             nextPageUrl,
//             lastPageUrl,
//             prevPageUrl,
//             lastPage: Math.ceil(total / perPage),
//         };
//     }
// }
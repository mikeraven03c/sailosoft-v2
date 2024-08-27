// import { databaseConfig } from "app/configs/databaseConfig";
import { resolvePageParameter } from "../paginations/paginationUtils";
import { SortParameter, sortRequestUtils } from "../sorts/sortUtils";

export interface DatabasePageParameter {
  skip: number;
  take: number;
  page: number;
}

export type DatabaseParameter = DatabasePageParameter & SortParameter<string>;
// export type DatabaseParameter = DatabasePageParameter & PageParameter;

function resolveUrl(url: string): URL {
  return new URL(url);
}

export function parameterToInt(url: URL, needle: string, defaultValue: number = 0): number {
  const parseValue = parseInt(url.searchParams.get(needle));
  const value = parseValue ? parseValue : defaultValue;

  return value;
}


export function urlParameterResolver({ url }: { url: string }) {
  const requestUrl = resolveUrl(url);

  const pageParameter = resolvePageParameter({
    requestUrl: requestUrl
  })

  const sortParameter = sortRequestUtils({ requestUrl }).getParameter();

  const databaseParameter: DatabaseParameter = {
    skip: pageParameter.skip,
    take: pageParameter.take,
    page: pageParameter.page,
    order: sortParameter.order
  }

  return {
    parameter: databaseParameter,
  };
}



const MODE_DESC = "DESC";
const MODE_ASC = "ASC";

type SortKey = string; // You can customize this to specific property types if needed

export interface SortParameter<T extends SortKey> {
  order: {
    [K in T]: 'ASC' | 'DESC';
  };
}

export function sortRequestUtils(
  { requestUrl }:
  { requestUrl: URL }
) {
  function databaseParameter(sort: string | null) : SortParameter<string> {
    const order: SortParameter<'id'> = {
      order: {
        id: MODE_DESC,
      },
    };

    if (sort == null) {
      return order;
    }

    const char = sort.charAt(0);
    const parameter = {
      order: "id",
      mode: MODE_DESC,
    };

    if (char == "-") {
      parameter.mode = MODE_DESC;
      parameter.order = sort.slice(1);
    } else {
      parameter.mode = MODE_ASC;
      parameter.order = sort;
    }

    const param = {
      order: {}
    }

    param.order[parameter.order] = parameter.mode
    return param;
  }
  return {
    getParameter(): SortParameter<string> {
      const sort = requestUrl.searchParams.get("sort")
      return databaseParameter(sort)
    }
  };
}



// type SortKey = 'name' | 'id' ;

// interface SortParameter<T extends SortKey> {
//   order: {
//     [K in T]: 'asc' | 'desc';
//   };
// }
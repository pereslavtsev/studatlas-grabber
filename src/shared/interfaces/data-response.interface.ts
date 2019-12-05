export interface DataResponse<T> {
  data: T[];
  meta: {
    page: {
      page: number;
      allPages: number;
      limit: number;
      total: number;
    };
  };
}

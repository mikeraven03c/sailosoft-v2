import { ResourceInterface } from '@/src/data/resources/resourceData';
import { useFetch, useDisclosure } from '@mantine/hooks';

interface OrganizationDataInterface extends ResourceInterface {}

export const OrganizationData: OrganizationDataInterface = {
  title: 'Organization',
  url: '/organizations',
};

export class OrganizationService {
  apiService: OrganizationRequestApiService;

  constructor(apiService: OrganizationRequestApiService) {
    this.apiService = apiService;
  }
  public static make() {
    return new OrganizationService(new OrganizationRequestApiService());
  }
}

class OrganizationRequestApiService {
  private baseUrl: string = 'http://test.sailosoft-v2.test/api';
  private resourceUrl: string = 'custom-apps/organizations';

  /**
   * hooks
   * @returns { data, loading, error, refetch, abort }
   */
  public async getData() {
    return useFetch(this.getDefaultUrl());
  }

  public getDefaultUrl(): string {
    return `${this.baseUrl}/${this.resourceUrl}`;
  }
}

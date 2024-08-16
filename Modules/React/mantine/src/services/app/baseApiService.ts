import { UseFormReturnType } from '@mantine/form';
import { BaseApiInterface, PaginationDataInterface } from './appService';
import { useAppFetch } from '@/src/app/actions/api/useAppFetch';
import { notifications } from '@mantine/notifications';

const RESPONSE_VALIDATION_ERROR = 422;
const RESPONSE_SUCCESS = 200;
const RESPONSE_UPDATE_SUCCESS = 201;

export abstract class BaseApiService implements BaseApiInterface {
  baseUrl: string | undefined = process.env.NEXT_PUBLIC_DEV_URL;
  abstract resourceUrl: string;

  public getDefaultUrl(): string {
    return `${this.baseUrl}/${this.resourceUrl}`;
  }

  /**
   * hooks
   * @returns { data, loading, error, refetch, abort }
   */
  public getFetch() {
    return useAppFetch<PaginationDataInterface>(this.getDefaultUrl());
  }

  public refetchPerPage({
    refetch,
    perPage,
    page,
  }: {
    perPage: number;
    page: number;
    refetch: (updateUrl?: string) => Promise<any> | undefined;
  }) {
    const url = new URL(this.getDefaultUrl());
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('page', page.toString());
    refetch(url.href);
  }

  public async formSubmit({
    form,
    success,
    formValidation,
  }: {
    form: any;
    success: (response: any) => void;
    formValidation: (response: any) => void;
    error?: (status: number, response: any) => void;
  }) {
    try {
      const headers = this.headers();

      const url = this.getDefaultUrl();
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: headers,
      });

      const result = await response.json();

      if (response.status == RESPONSE_VALIDATION_ERROR) {
        formValidation(result);
      }

      if (response.status == RESPONSE_SUCCESS || response.status == RESPONSE_UPDATE_SUCCESS) {
        success(result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async formUpdate({
    id,
    form,
    success,
    formValidation,
  }: {
    id: number;
    form: any;
    success: (response: any) => void;
    formValidation: (response: any) => void;
    error?: (status: number, response: any) => void;
  }) {
    try {
      const headers = this.headers();

      const url = this.getDefaultUrl();
      const response = await fetch(url + '/' + id, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: headers,
      });

      const result = await response.json();

      if (response.status == RESPONSE_VALIDATION_ERROR) {
        formValidation(result);
      }

      if (response.status == RESPONSE_SUCCESS || response.status == RESPONSE_UPDATE_SUCCESS) {
        success(result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async delete({
    ids,
    success,
  }: {
    ids: number | number[];
    success: (result: any) => void;
  }) {
    const id = Array.isArray(ids) ? ids.join(',') : ids;

    const headers = new Headers();
    const url = this.getDefaultUrl();

    const response = await fetch(url + '/' + id, {
      method: 'DELETE',
      headers: headers,
    });

    const result = await response.json();

    if (response.status == RESPONSE_SUCCESS) {
      success(result);
    }
  }

  private headers() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers;
  }
}

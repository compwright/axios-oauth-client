import { AxiosRequestConfig } from 'axios';
import AxiosTokenProvider from 'axios-token-interceptor';
import ClientFactory from './client';

declare function InterceptorFactory(tokenProvider: AxiosTokenProvider, authenticate: ClientFactory): AxiosTokenProvider.TokenProvider;
export = InterceptorFactory;

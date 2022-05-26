import { Request } from 'express';
import { ActiveDirectoryUser } from './active_directory_user';

export interface ActiveDirectoryRequest extends Request {
  active_directory_user: ActiveDirectoryUser;
}

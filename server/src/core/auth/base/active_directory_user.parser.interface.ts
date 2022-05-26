import { ActiveDirectoryUser } from './active_directory_user';

export interface ActiveDirectoryUserParserInterface {
  parse(user: Record<string, any>): ActiveDirectoryUser;
}

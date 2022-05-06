import { config } from '../../../../config/configuration';

export const POSTGRES_DATASOURCE = {
  type: config.database.main.adapter,
  host: config.database.main.host,
  port: config.database.main.port,
  username: config.database.main.username,
  password: config.database.main.password,
  database: config.database.main.database,
  autoLoadEntities: true,
  synchronize: true,
};

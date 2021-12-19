// Types
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['src/migrations/*{.ts,.js}'],
};

export default mysqlConfig;

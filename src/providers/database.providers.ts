// Utils
import { createConnection } from 'typeorm';

// Types
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) =>
      await createConnection({
        type: config.get('DATABASE_TYPE'),
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        database: config.get('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrationsTableName: 'custom_migration_table',
        migrations: ['dist/migrations/*{.js,.ts}'],
        migrationsRun: true,
        synchronize: true,
      }),
  },
];

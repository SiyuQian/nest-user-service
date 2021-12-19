import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class UserRoleTable1639888349303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users Table
    await queryRunner.createTable(
      new Table({
        name: this.getUserTableName(),
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'firstname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: true,
            default: true,
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      false,
    );

    // Create roles table
    await queryRunner.createTable(
      new Table({
        name: this.getRoleTableName(),
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      false,
    );

    // create foreign key
    await queryRunner.createForeignKey(
      this.getUserTableName(),
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: this.getRoleTableName(),
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.getUserTableName());
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role_id') !== -1,
    );
    await queryRunner.dropForeignKey(this.getUserTableName(), foreignKey);
    await queryRunner.dropTable(this.getUserTableName());
    await queryRunner.dropTable(this.getRoleTableName());
  }

  /**
   * @returns {string}
   */
  public getRoleTableName() {
    return 'aenlab_roles';
  }
  /**
   * @returns {string}
   */
  public getUserTableName() {
    return 'aenlab_users';
  }
}

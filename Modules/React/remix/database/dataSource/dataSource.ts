import { databaseConfig } from "app/configs/databaseConfig"
import { DataSource } from "typeorm"
import { entityConfig } from 'app/configs/entityConfig';

const driver = databaseConfig.driver[databaseConfig.default];
driver.entities = entityConfig.entities;

export const dataSource:DataSource = new DataSource(driver)
import {
  ID,
  InternalServerError,
  TransactionalConnection,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Project } from "./model/project.model";

@Injectable()
export class ProjectRepository {
  private projectRepo: Repository<Project>;
  constructor(connect: TransactionalConnection) {
    this.projectRepo = connect.rawConnection.getRepository(Project);
  }

  async findOne(id: ID): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: {
        id,
      },
    });

    if (!project) throw new InternalServerError("Project does not exist");

    return project;
  }
}

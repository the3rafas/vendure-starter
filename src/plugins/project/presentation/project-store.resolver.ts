import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";

import { Ctx, RequestContext } from "@vendure/core";
import { PaginateProject } from "./input/filter-project.input";
import { ProjectService } from "../project.service";
import { FindProjectInput } from "./input/find-project.input";
import { Project } from "../infrastructure/model/project.model";

@Resolver()
export class ProjectStoreResolver {
  constructor(private projectService: ProjectService) {}

  @Query((type) => [Project])
  Projects(@Args("input") input: PaginateProject) {
    return this.projectService.retriveProjects(input);
  }

  @Query((type) => Project)
  Project(@Args("input") input: FindProjectInput): Promise<Project> {
    return this.projectService.retriveProject(input.projectId);
  }
}

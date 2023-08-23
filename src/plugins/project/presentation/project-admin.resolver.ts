import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";
import { ProjectService } from "../project.service";
import { Project } from "../infrastructure/model/project.model";
import { ProjectInput } from "./input/create-project.input";

@Resolver()
export class ProjectAdminResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation((type) => Project)
  createProject(
    @Args("input") input: ProjectInput,
    @Ctx() ctx: RequestContext
  ) {
    return this.projectService.createProject(input, ctx);
  }

  //   @Query((type) => Project)
  //   Project(@Args("input") input: FindProjectInput): Promise<Project> {
  //     return this.projectService.retriveProject(input.projectId);
  //   }
}

import {
  AssetService,
  ChannelService,
  ID,
  ListQueryBuilder,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProjectRepository } from "./infrastructure/project.repository";
import { UtilsService } from "../utils/utils.service";
import { Project } from "./infrastructure/model/project.model";
import { ProjectTranslation } from "./infrastructure/model/project-translation";
import { ProjectInput } from "./presentation/input/create-project.input";
import { PaginateProject } from "./presentation/input/filter-project.input";

@Injectable()
export class ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private translateSaver: TranslatableSaver,
    private channelService: ChannelService,
    private assetService: AssetService,
    private utils: UtilsService
  ) {}

  async createProject(input: ProjectInput, ctx: RequestContext) {
    await this.utils.validateSlug(Project, [
      input.slug,
      ...input.translations.map((e) => e.slug),
    ]);
    console.dir(input, { depth: null });

    const project = await this.translateSaver.create({
      ctx,
      input,
      entityType: Project,
      translationType: ProjectTranslation,
      beforeSave: async (p: any) => {
        await this.channelService.assignToCurrentChannel(p, ctx);
        await this.assetService.updateFeaturedAsset(ctx, p, input);
      },
    });
    console.log(project);

    // await this.assetService.updateEntityAssets(ctx, project, {
    //   assetIds: [2],
    //   featuredAssetId: 2,
    // });
    return project;
  }
  async retriveProjects(input: PaginateProject) {
    return await this.utils.listEntityPagination(
      Project,
      ["featuredAsset"],
      input?.filter,
      input?.page,
      input?.limit
    );
  }
  async retriveProject(id: ID): Promise<Project> {
    return await this.projectRepo.findOne(id);
  }
}

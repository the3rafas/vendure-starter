import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { UtilsPlugin } from "../utils/utils.module";
import { ProjectService } from "./project.service";
import { ProjectRepository } from "./infrastructure/project.repository";
import { ProjectStoreResolver } from "./presentation/project-store.resolver";
import { Project } from "./infrastructure/model/project.model";
import { ProjectTranslation } from "./infrastructure/model/project-translation";
import { ProjectStoreschema } from "./presentation/schema/store";
import { ProjectAdminResolver } from "./presentation/project-admin.resolver";
import { ProjectAdminschema } from "./presentation/schema/admin";

@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [ProjectService, ProjectRepository],
  entities: [Project, ProjectTranslation],
  adminApiExtensions: {
    schema: ProjectAdminschema,
    resolvers: [ProjectAdminResolver],
  },
  shopApiExtensions: {
    schema: ProjectStoreschema,
    resolvers: [ProjectStoreResolver],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class ProjectPlugin {}

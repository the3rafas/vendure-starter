import * as DataLoader from "dataloader";
import { Inject, Injectable } from "@nestjs/common";
// import {
//   // IDataLoaderService,
//   UserDataLoaderType,
//   UserLoaderType,
// } from "../_common/dataloader/dataloader.interface";
// implements IDataLoaderService
@Injectable()
export class UserDataloader {
  constructor() {}

  // public createLoaders(): UserDataLoaderType {
  //   const userLoader: UserLoaderType = new DataLoader(
  //     async (senderIds: string[]) => await this.findUserByIds(senderIds)
  //   );

  //   return {
  //     userLoader,
  //   };
  // }
  // private async findSecurityGroupsByIds(securityGroupsIds: string[]) {
  //   const securityGroups = await this.securityGroupRepo.findAll({
  //     id: securityGroupsIds,
  //   });
  //   const securityGroupMap = await this.helper.deriveMapFromArray(
  //     securityGroups,
  //     (securityGroup: SecurityGroup) => securityGroup.id
  //   );
  //   return securityGroupsIds.map((id) => securityGroupMap.get(id));
  // }

  // private async findUserByIds(usersIds) {
  //   const users = await this.userRepo.findAll({ id: usersIds });
  //   const userMap = await this.helper.deriveMapFromArray(
  //     users,
  //     (user: User) => user.id
  //   );
  //   return usersIds.map((id) => userMap.get(id));
  // }
}

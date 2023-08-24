import { PermissionDefinition } from "@vendure/core";

export const Create_Banner = new PermissionDefinition({
  name: "Create_Banner",
  description: "Allows admins to create Banners via Admin API",
});
export const Update_Banner = new PermissionDefinition({
  name: "update_Banner",
  description: "Allows admins to update Banners via Admin API",
});
export const Delete_Banner = new PermissionDefinition({
  name: "Delete_Banner",
  description: "Allows admins to delete Banners via Admin API",
});

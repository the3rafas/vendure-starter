import { PermissionDefinition } from "@vendure/core";

export const Create_Blog = new PermissionDefinition({
  name: "Create_Blog",
  description: "Allows admins to create blogs via Admin API",
});
export const update_Blog = new PermissionDefinition({
  name: "update_Blog",
  description: "Allows admins to update blogs via Admin API",
});
export const Delete_Blog = new PermissionDefinition({
  name: "Delete_Blog",
  description: "Allows admins to delete blogs via Admin API",
});

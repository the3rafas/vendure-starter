import { PermissionDefinition } from "@vendure/core";

export const Create_Project = new PermissionDefinition({
  name: "Create_Project",
  description: "Allows admins to create Projects via Admin API",
});
export const update_Project = new PermissionDefinition({
  name: "update_Project",
  description: "Allows admins to update Projects via Admin API",
});
export const Delete_Project = new PermissionDefinition({
  name: "Delete_Project",
  description: "Allows admins to delete Projects via Admin API",
});

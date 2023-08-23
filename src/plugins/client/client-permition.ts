import { PermissionDefinition } from '@vendure/core';

export const sync = new PermissionDefinition({
  name: 'SyncInventory',
  description: 'Allows syncing stock levels via Admin API'
});
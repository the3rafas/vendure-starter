import { VendurePlugin } from "@vendure/core";
import { DataloaderService } from "./dataloader.service";

@VendurePlugin({
  providers: [DataloaderService],
})
export class DataloaderPlugin {}

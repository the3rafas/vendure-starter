import { Injectable } from "@nestjs/common";
import { Blog } from "./model/blog.model";
import { Repository } from "typeorm";
import {
  ID,
  InternalServerError,
  TransactionalConnection,
} from "@vendure/core";
import { BlogInput } from "../presentation/input/create-blog.input";
@Injectable()
export class BlogRepository {
  blogRepo: Repository<Blog>;
  constructor(private connection: TransactionalConnection) {
    this.blogRepo = this.connection.rawConnection.getRepository(Blog);
  }

  async createOne(data: BlogInput) {
    const client = this.blogRepo.create({
      // title: data.title,
      // description: data.description,
      // slug: data.slug,
      // thumbnail: data.thumbnail,
    });

    return await this.blogRepo.save(client);
  }
  async findAll() {
    return await this.blogRepo.find({ where: {} });
  }
  async findOne(id: ID) {
    const blog = await this.blogRepo.findOne({ where: { id } });

    if (!blog) throw new InternalServerError("Blog does not exist");

    return blog;
  }

  async delete(id: number) {
    return !!(await this.blogRepo.delete(id));
  }
}

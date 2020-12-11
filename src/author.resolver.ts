import { UsePipes, ValidationPipe } from "@nestjs/common";
import { Query, Args, ObjectType, Resolver, Field, ArgsType, Mutation } from "@nestjs/graphql";

@ObjectType()
class Author {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  lastName: string;
}

@ArgsType()
class GetAuthorArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  lastName: string;
}

@ArgsType()
class UpdateAuthorArgs {
  @Field()
  firstName?: string;
}

@Resolver(() => Author)
export class AuthorResolver {
  /**
   *
   * ```
   * query {
   *   getAuthor(firstName: "bob") {
   *     firstName
   *   }
   * }
   * ```
   */
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Query(() => Author)
  async getAuthor(
    @Args() args: GetAuthorArgs
  ) {
    return args;
  }

  /**
   *
   * ```
   * query {
   *   getAuthorWithoutPipe(firstName: "bob") {
   *     firstName
   *   }
   * }
   * ```
   */
  @Query(() => Author)
  @UsePipes(new ValidationPipe({ whitelist: false }))
  async getAuthorWithoutPipe(
    @Args() args: GetAuthorArgs
  ) {
    return args;
  }

  /**
   *
   * ```
   * mutation {
   *   updateAuthor(firstName: "bob") {
   *     firstName
   *   }
   * }
   * ```
   */
  @Mutation(() => Author)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateAuthor(
    @Args() args: UpdateAuthorArgs
  ) {
    console.log(args); // will always be an empty object
    return args;
  }

  /**
   *
   * ```
   * mutation {
   *   updateAuthorWithoutPipe(firstName: "bob") {
   *     firstName
   *   }
   * }
   * ```
   */
  @Mutation(() => Author)
  @UsePipes(new ValidationPipe({ whitelist: false }))
  async updateAuthorWithoutPipe(
    @Args() args: UpdateAuthorArgs
  ) {
    console.log(args); // will work
    return args;
  }
}

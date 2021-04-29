import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user-input";
import { DeleteUserInput } from "./dto/input/delete-user-input";
import { UpdateUserInput } from "./dto/input/update-user-input";
import { User } from "./models/user";
import { UsersService } from "./users.services";

@Resolver( () => User )
export class UsersResolver{

  constructor(private readonly usersService: UsersService){}

  @Query( () => User, { name: 'user', nullable: true } )
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser( getUserArgs );
  }
  @Query( () => [User], { name: 'users', nullable: 'items'})
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[]{
    return this.usersService.getUsers(getUsersArgs);
  }
  @Mutation( () => User )
  create(@Args("createUserData") createUserData: CreateUserInput): User {
    return this.usersService.create(createUserData);
  }
  @Mutation( () => User )
  update(@Args("updateUserData") updateUserData: UpdateUserInput): User {
    return this.usersService.update(updateUserData);
  }

  @Mutation( () => User )
  delete(@Args("deleteUserData") deleteUserData: DeleteUserInput): User {
    return this.usersService.delete(deleteUserData);
  }
}
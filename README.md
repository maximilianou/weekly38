# weekly38

## nestjs, graphql, Makefile

---
- Makefile
```
step01:
	npm i -g @nestjs/cli
step02:
	nest new notes
step03:
	curl -X POST http://localhost:40000/products -H "Content-Type: application/json" -d '{ "title":"Jacket", "description":"Big and Tall, long sleeve, full zip", "price": 8000}'
step04:
	curl http://localhost:40000/products
step10:
	nest new articles
step11:
	cd articles && npm install @nestjs/graphql graphql-tools graphql apollo-server-express
	cd articles && npm install class-validator
	cd articles && npm install uuid
step12:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"mutation { create(  createUserData: { email: \"maximilianou@gmail.com\", age: 46}){ userId, email, age, isSubscribed } }"}'
step13:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"query { user(  userId: \"71d281d4-8ae3-44d9-af64-78a5dac525f9\"){ userId, email, age, isSubscribed } }"}'
step14:
	curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '{ "query":"mutation { update( updateUserData: { userId: \"71d281d4-8ae3-44d9-af64-78a5dac525f9\", age: 47}){ userId, email, age, isSubscribed } }"}'
step20:
	cd articles && npm run start:dev

```

---
- main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```
---
- app.module.ts
```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

---
- users.module.ts
```ts
import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolvers";
import { UsersService } from "./users.services";

@Module({
  providers: [UsersResolver, UsersService]
})
export class UsersModule{}

```

---
- users.resolvers.ts
```ts
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
```
---
- users.services.ts
```ts
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user-input";
import { DeleteUserInput } from "./dto/input/delete-user-input";
import { UpdateUserInput } from "./dto/input/update-user-input";
import { User } from "./models/user";

@Injectable()
export class UsersService{
  private users: User[] = [];
  public create(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData
    }
    this.users.push(user);
    return user;
  }
  public update(updateUserData: UpdateUserInput): User{
    const user = this.users.find( user => user.userId === updateUserData.userId);
    Object.assign(user, updateUserData);
    return user;
  }
  public delete(deleteUserData: DeleteUserInput): User{
    const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
  public getUser(getUserArgs: GetUserArgs): User{
    return this.users.find(user => user.userId === getUserArgs.userId)
  }
  public getUsers(getUsersArgs: GetUsersArgs): User[]{
    return getUsersArgs.userIds.map( userId => this.getUser({ userId }));
  }

}

```
---
- user.ts
```ts
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User{

  @Field()
  userId: string;

  @Field()
  email: string;

  @Field( () => Int )
  age: number;

  @Field({ nullable: true})
  isSubscribed?: boolean;

}
```
---
- get-user.args.ts
```ts
import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
  @Field()
  @IsNotEmpty()
  userId: string;
}

```
---
- get-users.args.ts
```ts
import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@ArgsType()
export class GetUsersArgs {
  @Field( () => [String] )
  @IsArray()
  userIds: [string];
}

```
---
- create-user-input.ts
```ts
import { Field, InputType } from "@nestjs/graphql";
import {  IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput{

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  age: number;
}
```
---
- delete-user-input.ts
```ts
import { Field, InputType } from "@nestjs/graphql";
import {  IsNotEmpty } from "class-validator";

@InputType()
export class DeleteUserInput{
  
  @Field()
  @IsNotEmpty()
  userId: string;

}
```
---
- update-user-input.ts
```ts
import { Field, InputType } from "@nestjs/graphql";
import {  IsNotEmpty,  IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput{
  
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  isSubscribed?: boolean;
}
```


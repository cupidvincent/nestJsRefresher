import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: {
        id: number;
        name: string;
        email: string;
        role: 'developer' | 'manager' | 'intern';
    }[] = [
        {
            id: 1,
            name: 'name 1',
            email: 'email1@test.com',
            role: 'intern',
        },
        {
            id: 2,
            name: 'name 2',
            email: 'email2@test.com',
            role: 'intern',
        },
        {
            id: 3,
            name: 'name 3',
            email: 'email3@test.com',
            role: 'manager',
        },
        {
            id: 4,
            name: 'name 4',
            email: 'email4@test.com',
            role: 'developer',
        },
    ];

    findAll(role?: 'developer' | 'manager' | 'intern') {
        if (role) {
            return this.users.filter(
                (user: { id: number; name: string; email: string; role: string }) =>
                    user.role === role,
            );
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(
            (user: { id: number; name: string; email: string; role: string }) => user.id === id,
        );
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    create(user: CreateUserDto) {
        const userHighestId = [...this.users].sort((a, b) => (b.id = a.id));

        const newUSer = {
            id: userHighestId[0].id + 1,
            ...user,
        };
        this.users.push(newUSer);

        return newUSer;
    }

    patchOne(id: number, updatedUser: UpdateUserDto) {
        const updateIndex = this.users.findIndex((user) => user.id === id);

        this.users = this.users.map((user) => {
            if (user.id === id) {
                user = {
                    ...user,
                    ...updatedUser,
                };
            }
            return user;
        });

        return this.users[updateIndex];
    }

    deleteOne(id: number) {
        const deleted = this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id);

        return deleted;
    }
}

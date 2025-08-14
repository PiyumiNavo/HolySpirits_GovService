# Backend Testing Guide (NestJS)

## Why Write Tests?
- **Stability**: Catch regressions early.
- **Confidence**: Know your code works as expected.

## Where to Write Tests
- **UsersService**: User creation, password hashing, finding by email, error on not found.
- **AuthService**: User validation, password rejection, JWT generation.
- **Controllers**: Register/login endpoints, unauthorized cases.

## Example: `users.service.spec.ts`
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel;

  beforeEach(async () => {
    mockUserModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should hash password on create', async () => {
    const dto = { email: 'test@test.com', password: '123456' };
    mockUserModel.create.mockImplementationOnce((user) => Promise.resolve(user));

    const createdUser = await service.create(dto);

    expect(bcrypt.compareSync('123456', createdUser.password)).toBe(true);
  });

  it('should find user by email', async () => {
    const user = { email: 'test@test.com' };
    mockUserModel.findOne.mockReturnValue({ exec: () => user });

    expect(await service.findByEmail('test@test.com')).toEqual(user);
  });
});
```

## Run Tests
```bash
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run test:cov     # Coverage report
```

## Coverage Example
```
----------------|---------|----------|---------|---------
File            | % Stmts | % Branch | % Funcs | % Lines
----------------|---------|----------|---------|---------
All files       |   85.71 |    78.57 |   80.00 |   85.71
users.service.ts|   90.00 |    83.33 |   85.71 |   90.00
auth.service.ts |   80.00 |    75.00 |   75.00 |   80.00
----------------|---------|----------|---------|---------
```

- Write `.spec.ts` files for each service/controller.
- Use mocks for DB and external dependencies.
- Test both success and failure cases.

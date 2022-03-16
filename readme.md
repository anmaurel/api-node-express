## Project launch
#### 1 - Install depedencies
```bash
npm i
```
#### 2 - Create .env file & allocate value to variables
```bash
cp .env.example .env
```
#### 3 - Execute db migration & seeder
```bash
npx prisma migrate dev
npx prisma db seed
```
#### 4 - Start the server
```bash
npm run dev
```

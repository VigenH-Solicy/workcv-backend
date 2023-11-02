import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://vigenhovhannisian:Gyslq5bvFrtIPu6M@mycluster.mnuqfe0.mongodb.net/?retryWrites=true&w=majority',
    ),
    ProfileModule,
  ],
})
export class AppModule {}

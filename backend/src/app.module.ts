import { Module } from '@nestjs/common';
import { R2Controller } from './r2.controller';
import { R2Service } from './r2.service';

@Module({
  imports: [],
  controllers: [R2Controller],
  providers: [R2Service],
})
export class AppModule {}

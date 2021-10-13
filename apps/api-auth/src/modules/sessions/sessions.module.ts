import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

@Module({
  imports: [DatabaseModule],
  providers: [SessionsService, SessionsRepository],
  exports: [SessionsService],
})
export class SessionsModule {}

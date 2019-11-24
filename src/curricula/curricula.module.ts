import { Module } from '@nestjs/common';
import { CurriculaController } from './controllers/curricula.controller';
import { CurriculaService } from './services/curricula.service';

@Module({
  controllers: [CurriculaController],
  providers: [CurriculaService],
  exports: [CurriculaService],
})
export class CurriculaModule {}

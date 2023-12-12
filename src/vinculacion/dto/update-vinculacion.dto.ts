import { PartialType } from '@nestjs/mapped-types';
import { CreateVinculacionDto } from './create-vinculacion.dto';

export class UpdateVinculacionDto extends PartialType(CreateVinculacionDto) {}

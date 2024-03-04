import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateDistributionListDto {
  @IsString()
  name: string;
}

export class UpdateListNameDto {
  @IsString()
  @IsUUID()
  distributionListId: string;

  @IsString()
  name: string;
}

export class UpdateClientListDto {
  @IsString()
  @IsUUID()
  distributionListId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsUUID(5, { each: true })
  clientIds: string[];
}

export class DeleteDistributionListDto {
  @IsString()
  @IsUUID()
  distributionListId: string;
}

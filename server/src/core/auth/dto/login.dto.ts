import { User } from '@dng-3decision/core/models';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ppuser@foo.bar' })
  username: string;

  @ApiProperty({ example: 'whateverpassword' })
  password: string;
}

export class LoginDtoResponse {
  user?: User;
  access_token: string;
}

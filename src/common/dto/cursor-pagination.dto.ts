import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CursorPaginationDto {
  @IsString()
  @IsOptional()
  // id_52, likeCount_20
  cursor?: string;

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  // id_ASC id_DESC
  // [id_DESC, likeCount_DESC]
  // 기본값은 내림차순
  order: string[] = ['id_DESC'];

  @IsInt()
  @Transform(({ value }) => {
    // value가 문자열일 때만 parseInt로 변환
    const parsedValue = parseInt(value, 10);
    console.log(parsedValue);
    return isNaN(parsedValue) ? 2 : parsedValue; // 값이 유효한 숫자가 아니면 기본값 2
  })
  @IsOptional()
  take: number = 2;
}

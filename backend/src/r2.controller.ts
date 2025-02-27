import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
  Body,
} from '@nestjs/common';
import { R2Service } from './r2.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Get()
  async listFiles(@Query('prefix') prefix: string) {
    return await this.r2Service.listFiles(prefix || '');
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') path?: string,
  ) {
    let key = file.originalname;
    if (path) {
      const normalizedPath = path.replace(/\/$/, '');
      key = `${normalizedPath}/${file.originalname}`;
    }
    await this.r2Service.uploadFile(key, file.buffer);
    return { message: 'File uploaded successfully', key };
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    await this.r2Service.deleteFile(key);
    return { message: 'File deleted successfully', key };
  }

  @Delete('folder/:prefix')
  async deleteFolder(@Param('prefix') prefix: string) {
    return this.r2Service.deleteFolder(prefix);
  }

  @Get('download/:key')
  async downloadFile(@Param('key') key: string, @Res() res: Response) {
    const stream = await this.r2Service.downloadFile(key);
    res.set({
      'Content-Disposition': `attachment; filename="${key}"`,
      'Content-Type': 'application/octet-stream',
    });
    stream.pipe(res);
  }

  @Post('rename')
  async renameFile(@Body() body: { oldKey: string; newKey: string }) {
    const result = await this.r2Service.renameFile(body.oldKey, body.newKey);
    return { message: 'File renamed successfully', result };
  }

  @Post('create-folder')
  async createFolder(@Body() body: { folderName: string }) {
    await this.r2Service.createFolder(body.folderName);
    return {
      message: 'Folder created successfully',
      folderName: body.folderName,
    };
  }
}

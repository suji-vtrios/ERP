import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { DocumentGeneratorService }
  from './document-generator.service';

@Controller('documents')
export class DocumentGeneratorController {

  constructor(
    private readonly documentGeneratorService:
      DocumentGeneratorService,
  ) {}

  @Get('download/:requestId')
  async download(
    @Param('requestId') requestId: string,
    @Res() res: Response,
  ) {

    const file =
      await this.documentGeneratorService
        .getDocumentPath(requestId);

    return res.download(file);

  }

}
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { BranchService } from './branch.service';

import { CreateBranchDto }
from './dto/create-branch.dto';

import { UpdateBranchDto }
from './dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Branch',
  })
  create(
    @Body()
    dto: CreateBranchDto,
  ) {
    return this.branchService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Branches',
  })
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Branch By Id',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.branchService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Branch',
  })
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateBranchDto,
  ) {
    return this.branchService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Branch',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.branchService.remove(id);
  }
}
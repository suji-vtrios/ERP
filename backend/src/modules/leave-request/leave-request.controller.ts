import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,

} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { LeaveRequestService } from './leave-request.service';

import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequestFilterDto } from './dto/leave-request-filter.dto';
import { ProcessLeaveRequestDto } from './dto/process-leave-request.dto';

@ApiTags('Leave Request')
@Controller('leave-requests')
export class LeaveRequestController {
  constructor(
    private readonly leaveRequestService: LeaveRequestService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateLeaveRequestDto,
  ) {
    const data =
      await this.leaveRequestService.create(dto);

    return {
      success: true,
      data,
    };
  }

  @Get()
  async findAll(
    @Query() filters: LeaveRequestFilterDto,
  ) {
    const data =
      await this.leaveRequestService.findAll(filters);

    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    const data =
      await this.leaveRequestService.findOne(id);

    return {
      success: true,
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLeaveRequestDto,
  ) {
    const data =
      await this.leaveRequestService.update(
        id,
        dto,
      );

    return {
      success: true,
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    const data =
      await this.leaveRequestService.remove(id);

    return {
      success: true,
      data,
    };
  }

  @Post(':id/submit')
    submit(
    @Param('id') id: string,
    ) {
    return this.leaveRequestService.submit(id);
    }

 @Post(':id/approve')
    approve(
    @Param('id') id: string,
    @Body() dto: ProcessLeaveRequestDto,
    ) {
    return this.leaveRequestService.approve(
        id,
        dto,
    );
    }

    @Post(':id/reject')
    reject(
    @Param('id') id: string,
    @Body() dto: ProcessLeaveRequestDto,
    ) {
    return this.leaveRequestService.reject(
        id,
        dto,
    );
    }

    @Get('pending-approvals/:approverId')
        async getPendingApprovals(
        @Param('approverId')
        approverId: string,
        ) {
        const data =
            await this.leaveRequestService.getPendingApprovals(
            approverId,
            );

        return {
            success: true,
            data,
        };
        }
}
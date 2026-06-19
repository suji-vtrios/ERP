import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProjectTeamMemberDto } from './dto/create-project-team-member.dto';
import { UpdateProjectTeamMemberDto } from './dto/update-project-team-member.dto';

@Injectable()
export class ProjectTeamMembersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateProjectTeamMemberDto,
  ) {
    const existing =
      await this.prisma.projectTeamMember.findFirst({
        where: {
          projectId: dto.projectId,
          employeeId: dto.employeeId,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Employee already assigned to project',
      );
    }

    return this.prisma.projectTeamMember.create({
      data: {
        ...dto,
      },
      include: {
        employee: true,
        project: true,
      },
    });
  }

  async findByProject(
    projectId: string,
  ) {
    return this.prisma.projectTeamMember.findMany({
      where: {
        projectId,
      },
      include: {
        employee: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(
    id: string,
    dto: UpdateProjectTeamMemberDto,
  ) {
    return this.prisma.projectTeamMember.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const member =
      await this.prisma.projectTeamMember.findUnique({
        where: { id },
      });

    if (!member) {
      throw new NotFoundException(
        'Team member not found',
      );
    }

    return this.prisma.projectTeamMember.delete({
      where: { id },
    });
  }
}
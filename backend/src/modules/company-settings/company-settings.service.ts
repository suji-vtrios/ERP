import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanySettingDto } from './dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company-setting.dto';

@Injectable()
export class CompanySettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanySettingDto) {
    const existing = await this.prisma.companySetting.findFirst({
      where: {
        companyId: dto.companyId,
        settingKey: dto.settingKey,
      },
    });

    if (existing) {
      throw new ConflictException(
        `Setting '${dto.settingKey}' already exists for this company`,
      );
    }

    return this.prisma.companySetting.create({
      data: dto,
    });
  }

  async findAllByCompany(companyId: string) {
    return this.prisma.companySetting.findMany({
      where: { companyId },
      orderBy: { settingKey: 'asc' },
    });
  }

  async findById(id: string) {
    const setting = await this.prisma.companySetting.findUnique({
      where: { id },
    });

    if (!setting) {
      throw new NotFoundException('Company setting not found');
    }

    return setting;
  }

  async findByKey(companyId: string, settingKey: string) {
    return this.prisma.companySetting.findFirst({
      where: {
        companyId,
        settingKey,
      },
    });
  }

  async update(id: string, dto: UpdateCompanySettingDto) {
    await this.findById(id);

    return this.prisma.companySetting.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return this.prisma.companySetting.delete({
      where: { id },
    });
  }

  async getSettingValue(
    companyId: string,
    settingKey: string,
  ): Promise<string | null> {
    const setting = await this.prisma.companySetting.findFirst({
      where: {
        companyId,
        settingKey,
      },
    });

    return setting?.settingValue ?? null;
  }
}
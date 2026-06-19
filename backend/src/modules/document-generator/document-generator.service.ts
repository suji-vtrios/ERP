import { Injectable } from '@nestjs/common';

import { PrismaService }
  from '../../prisma/prisma.service';

import PDFDocument from 'pdfkit';

import * as fs from 'fs';

import * as path from 'path';

@Injectable()
export class DocumentGeneratorService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async generateDocument(
    requestId: string,
    ) {

    const request =
        await this.prisma.hrRequest.findUnique({
        where: {
            id: requestId,
        },
        include: {
            employee: {
            include: {
                company: true,
                designation: true,
                department: true,
                branch: true,
            },
            },
            requestType: true,
        },
        });

    if (!request) {
        throw new Error(
        'HR Request not found',
        );
    }

    const template =
        await this.prisma.documentTemplate.findFirst({
        where: {
            companyId:
            request.employee.companyId,

            templateCode:
            request.requestType.requestCode,

            isActive: true,
        },
        });

    if (!template) {
        throw new Error(
        `Template not found for ${request.requestType.requestCode}`,
        );
    }

    const finalContent =
        this.resolvePlaceholders(
            template.templateContent,
            request,
        );

        console.log('FINAL CONTENT');
        console.log(finalContent);


    const uploadDir =
        path.join(
        process.cwd(),
        'uploads',
        'documents',
        );

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
        recursive: true,
        });
    }

    const fileName =
        `${template.templateCode}_${request.requestNo}.pdf`;

    const filePath =
        path.join(
        uploadDir,
        fileName,
        );

    const doc =
        new PDFDocument();

    const stream =
        fs.createWriteStream(
        filePath,
        );

    doc.pipe(stream);

    doc.fontSize(12);

    doc.text(finalContent);

    doc.end();

    await new Promise<void>(
        (resolve, reject) => {

        stream.on(
            'finish',
            () => resolve(),
        );

        stream.on(
            'error',
            reject,
        );

        },
    );

    await this.prisma.hrRequest.update({
        where: {
        id: request.id,
        },
        data: {
        generatedFilePath:
            filePath,
        },
    });

    return {
        fileName,
        filePath,
    };

    }

    async getDocumentPath(
        requestId: string,
        ) {

        const request =
            await this.prisma.hrRequest.findUnique({
            where: {
                id: requestId,
            },
            });

        if (
            !request ||
            !request.generatedFilePath
        ) {
            throw new Error(
            'Document not found',
            );
        }

        return request.generatedFilePath;
        }

    private resolvePlaceholders(
        content: string,
        request: any,
        ) {

        const placeholders = {

            employeeName:
            `${request.employee.firstName} ${request.employee.lastName ?? ''}`,

            employeeCode:
            request.employee.employeeCode,

            companyName:
            request.employee.company.companyName,

            designation:
            request.employee.designation?.designationName ?? '',

            department:
            request.employee.department.departmentName,

            branch:
            request.employee.branch.branchName,

            joiningDate:
            request.employee.joiningDate
                ? request.employee.joiningDate
                    .toISOString()
                    .split('T')[0]
                : '',

            requestNo:
            request.requestNo,

            requestDate:
            request.requestDate
                .toISOString()
                .split('T')[0],

        };

        Object.entries(placeholders)
            .forEach(([key, value]) => {

            content =
                content.replace(
                new RegExp(`{{${key}}}`, 'g'),
                String(value ?? ''),
                );

            });

        return content;
        }

        

}
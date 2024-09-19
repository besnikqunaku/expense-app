import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from './data';

interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReport(id: string, type: ReportType) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((item) => item.id === id);

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  createReport(type: ReportType, amount: number, source: string) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );

    if (reportIndex === -1) {
      throw new NotFoundException('Report not found');
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount: body.amount,
      source: body.source,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw new NotFoundException('Report not found');
    }

    data.report.splice(reportIndex, 1);
    return;
  }
}

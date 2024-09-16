import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const filteredData = data.report.filter(
      (report) => report.type === reportType,
    );
    const report = filteredData.find((item) => item.id === id);
    if (!report) return 'Sorry no report founded!';
    return report;
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: uuid(),
      amount: amount,
      source: source,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const filteredData = data.report.filter((item) => item.type === reportType);
    const reportToUpdated = filteredData.find((item) => item.id === id);

    if (!reportToUpdated) return 'Sorry report not founded!';

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdated.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount,
      source,
    };

    return data.report[reportIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return 'Sorry report not founded!';
    data.report.splice(reportIndex, 1);
    return 'Deleted';
  }
}

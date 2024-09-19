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
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appServie: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appServie.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appServie.getReport(id, reportType);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appServie.createReport(reportType, amount, source);
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appServie.updateReport(reportType, id, amount, source);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    this.appServie.deleteReport(id);
  }
}

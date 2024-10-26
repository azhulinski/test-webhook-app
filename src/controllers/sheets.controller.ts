import { Controller, Get, Param } from '@nestjs/common';
import { SheetsService } from '../services/sheets.service';
import { Logging } from '../decorators/logging.decorator';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GoogleSheets } from '../entities/google.sheets.entity';

@Controller('sheets')
export class SheetController {

  constructor(public sheetService: SheetsService) {
  }

  @ApiResponse({
    status: 200,
    type: GoogleSheets,
    description: 'The record has been successfully retrieved.'})
  @ApiParam({ name: 'id', type: String })
  @ApiOperation({summary: 'returns sheet record with the given id'})
  @Get('/:id')
  @Logging()
  findOne(@Param('id') id: string) {
    return this.sheetService.getById(parseInt(id))
  }

  @ApiResponse({
    type: GoogleSheets,
    isArray: true,
    status: 200,
    description: 'All records from DB have been successfully retrieved.'})
  @ApiOperation({summary: 'returns all sheet records'})
  @Get()
  @Logging()
  findAll() {
    return this.sheetService.getAll()
  }

}
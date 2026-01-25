import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets;
  private auth;

  constructor() {
    // Initialize only if credentials are configured
    if (process.env.GOOGLE_SHEETS_ENABLED === 'true') {
      this.initializeAuth();
    }
  }

  private initializeAuth() {
    try {
      // Authentication with service account credentials
      const credentials = JSON.parse(
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}',
      );

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      this.logger.log('Google Sheets API initialized successfully');
    } catch (error) {
      this.logger.error(
        'Error initializing Google Sheets API',
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  async appendRow(data: {
    cliente: string;
    telefono: string;
    email?: string;
    direccion?: string;
    tipoElectrodomestico: string;
    marca?: string;
    modelo?: string;
    problema: string;
    ubicacionServicio?: string;
    urgencia: string;
    fechaSolicitud: string;
  }): Promise<void> {
    if (process.env.GOOGLE_SHEETS_ENABLED !== 'true') {
      this.logger.warn('Google Sheets is disabled');
      return;
    }

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEET_NAME || 'Solicitudes';

    try {
      // Get the ID (next row number)
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${range}!A:A`,
      });
      const rowCount = response.data.values ? response.data.values.length : 1;
      const nextId = rowCount; // ID will be the row number (excluding header)

      const values = [
        [
          nextId, // ID
          data.fechaSolicitud, // Request Date
          data.cliente, // Client
          data.telefono, // Phone
          data.email || '', // Email
          data.direccion || '', // Address
          data.tipoElectrodomestico, // Appliance Type
          data.marca || '', // Brand
          data.modelo || '', // Model
          data.problema, // Issue
          data.ubicacionServicio || '', // Service Location
          data.urgencia, // Urgency
          'Pendiente', // Status (default: Pending)
        ],
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${range}!A:M`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      this.logger.log(
        `Row added successfully to Google Sheets for ${data.cliente}`,
      );
    } catch (error) {
      this.logger.error('Error adding row to Google Sheets', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async createHeaderRow(): Promise<void> {
    if (process.env.GOOGLE_SHEETS_ENABLED !== 'true') {
      return;
    }

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Solicitudes';

    try {
      // 1. Create headers
      const headers = [
        [
          'ID',
          'Fecha Solicitud',
          'Cliente',
          'Teléfono',
          'Email',
          'Dirección',
          'Tipo Electrodoméstico',
          'Marca',
          'Modelo',
          'Problema',
          'Ubicación Servicio',
          'Urgencia',
          'Estado',
        ],
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:M1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: headers,
        },
      });

      // 2. Apply formatting to headers
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            // Header format: cyan background, white text, bold
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 13,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.024,
                      green: 0.714,
                      blue: 0.831,
                    },
                    textFormat: {
                      foregroundColor: {
                        red: 1.0,
                        green: 1.0,
                        blue: 1.0,
                      },
                      fontSize: 11,
                      bold: true,
                    },
                    horizontalAlignment: 'CENTER',
                    verticalAlignment: 'MIDDLE',
                  },
                },
                fields:
                  'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
              },
            },
            // Adjust column widths
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 0,
                  endIndex: 1,
                },
                properties: { pixelSize: 50 }, // ID
                fields: 'pixelSize',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 1,
                  endIndex: 2,
                },
                properties: { pixelSize: 150 }, // Date
                fields: 'pixelSize',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 2,
                  endIndex: 3,
                },
                properties: { pixelSize: 150 }, // Client
                fields: 'pixelSize',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 3,
                  endIndex: 4,
                },
                properties: { pixelSize: 120 }, // Phone
                fields: 'pixelSize',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 9,
                  endIndex: 10,
                },
                properties: { pixelSize: 300 }, // Issue
                fields: 'pixelSize',
              },
            },
            // Freeze first row
            {
              updateSheetProperties: {
                properties: {
                  sheetId: 0,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      });

      this.logger.log(
        'Headers with professional formatting created in Google Sheets',
      );
    } catch (error) {
      this.logger.error(
        'Error creating headers in Google Sheets',
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
}

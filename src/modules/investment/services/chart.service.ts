import { Injectable } from '@nestjs/common';
import { CalculatedInvestmentInterface } from '../contracts/calculated-investment.interface';
import { ChartJSNodeCanvas, ChartCallback } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import { promises as fs } from 'fs';

const width = 800;
const height = 400;

@Injectable()
export class ChartService {
  async draw(investments: CalculatedInvestmentInterface[]): Promise<any> {
    const axisX = [];
    const axisY = [];

    for (const investment of investments) {
      axisX.push(investment.date);
      axisY.push(investment.unitPrice);
    }

    const configuration: ChartConfiguration = {
      type: 'line',
      data: {
        labels: axisX,
        datasets: [
          {
            label: 'CDB',
            data: axisY,
          },
        ],
      },
      options: {},
      plugins: [
        {
          id: 'background-colour',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          },
        },
      ],
    };
    const chartCallback: ChartCallback = (ChartJS) => {
      ChartJS.defaults.responsive = true;
      ChartJS.defaults.maintainAspectRatio = false;
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
      chartCallback,
    });
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return await fs.writeFile('./example.png', buffer, 'base64');
  }
}

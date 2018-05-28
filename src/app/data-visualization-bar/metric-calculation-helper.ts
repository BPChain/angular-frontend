import * as stats from 'stats-lite';
import { ChainData } from '../services/data-retriever.service';

export class MetricCalculationHelper {

  public initMetricDataset () {
    return {
      miningTime: [{data: 0, label: 'no chain selected'}],
      stability: [{data: 0, label: 'no chain selected'}],
      energyConsumption: [{data: 0, label: 'no chain selected'}],
      throughput: [{data: 0, label: 'no chain selected'}],
      dataTransfer: [{data: 0, label: 'no chain selected'}],
    };
  }

  private emptyMetricDataset () {
    return {
      miningTime: [],
      stability: [],
      energyConsumption: [],
      throughput: [],
      dataTransfer: [],
    };
  }

  private calculateMiningTime(entry): number {
    try {
      if (entry['avgBlocktime']) {
        const parameter = entry['avgBlocktime'].filter(item => item !== 0);
        const sum = stats.sum(parameter) ;
        return (sum / parameter.length) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateStability(entry): number {
    try {
      if (entry['avgBlocktime']) {
        const parameter = entry['avgBlocktime'].filter(item => item !== 0);
        return stats.stdev(parameter) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateEnergyConsumption(entry): number {
    try {
      const numberOfCpus = 4;
      const minConsumption = 105 * numberOfCpus;
      const maxConsumption = 130 * numberOfCpus;
      const consumptionDiff = maxConsumption - minConsumption;
      if (entry['avgCpuUsage'].length) {
        const cpuUsageParameter = entry['avgCpuUsage'].filter(item => item !== 0) || [];
        const avgCpuUsage = (stats.sum(cpuUsageParameter) / cpuUsageParameter.length) || 0;
        return minConsumption + consumptionDiff * avgCpuUsage / 100;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateThroughput(entry): number {
    try {
      if (entry['avgTransactions'] && entry['avgBlocktime']) {
        const transactionsParameter = entry['avgTransactions'].filter(item => item !== 0);
        const blocktimeParameter = entry['avgBlocktime'].filter(item => item !== 0);
        const avgTransactions = stats.sum(transactionsParameter) / transactionsParameter.length;
        const avgBlocktime = stats.sum(blocktimeParameter) / blocktimeParameter.length;
        return (avgTransactions / avgBlocktime) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateDataTransfer(entry): number {
    try {
      if (entry['numberOfHosts'] && entry['avgBlockSize'] && entry['avgBlocktime']) {
        const numberOfHostsParameter = entry['numberOfHosts'].filter(item => item !== 0);
        const avgNumberOfHosts = stats.sum(numberOfHostsParameter) / numberOfHostsParameter.length;
        const blocksizeParameter = entry['avgBlockSize'].filter(item => item !== 0);
        const blocktimeParameter = entry['avgBlocktime'].filter(item => item !== 0);
        const blocksizeAvg = stats.sum(blocksizeParameter) / blocksizeParameter.length;
        const blocktimeAvg = stats.sum(blocktimeParameter) / blocktimeParameter.length;
        return (blocksizeAvg / blocktimeAvg) * avgNumberOfHosts || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  public calculateMetrics(chainData: Array<ChainData>): object {
    const metricBuffer = this.emptyMetricDataset();
    try {
      chainData.forEach(entry => {
        metricBuffer['miningTime'].push({data: this.calculateMiningTime(entry), label: entry['chainName']});
        metricBuffer['stability'].push({data: this.calculateStability(entry), label: entry['chainName']});
        metricBuffer['energyConsumption'].push({data: this.calculateEnergyConsumption(entry), label: entry['chainName']});
        metricBuffer['throughput'].push({data: this.calculateThroughput(entry), label: entry['chainName']});
        metricBuffer['dataTransfer'].push({data: this.calculateDataTransfer(entry), label: entry['chainName']});
      });
      return metricBuffer;
    } catch (error) {
      console.warn(error);
      return this.initMetricDataset;
    }
  }
}

export default new MetricCalculationHelper();

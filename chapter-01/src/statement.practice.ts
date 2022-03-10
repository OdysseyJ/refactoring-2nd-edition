import {Invoice, Plays, StatementData} from './types';
import createStatementData from "./createStatementData";

function usd(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber/100);
}

export default function statement(invoice: Invoice, plays: Plays){
  return renderPlainText(createStatementData(invoice, plays), plays)
}

function renderPlainText(data: StatementData, plays: Plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name} : ${usd(perf.amount)} (${
        perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

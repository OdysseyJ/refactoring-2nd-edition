import {Invoice, Play, Plays, Performance, StatementData} from './types';

function usd(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber/100);
}

export default function statement(invoice: Invoice, plays: Plays) {
  const statementData : StatementData = {}
  statementData.customer = invoice.customer
  return renderPlainText(invoice, plays)
}

function renderPlainText(invoice: Invoice, plays: Plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += `${playFor(perf).name} : ${usd(amountFor(perf))} (${
        perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance: Performance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result
  }

  function playFor(perf: Performance) {
    const play = plays[perf.playID];
    return play;
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case 'tragedy': // 비극
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`);
    }
    return result
  }

}
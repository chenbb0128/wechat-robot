const QrTerminal = require('qrcode-terminal');
const { log, ScanStatus } = require('wechaty');

const onScan = function (qrCode, status) {
  console.log(status)
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    QrTerminal.generate(qrCode, { small: true });
    const qrCodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrCode)].join('');
    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrCodeImageUrl);
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  }
}

module.exports = onScan;

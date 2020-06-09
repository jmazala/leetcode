const _ = require('lodash');

/**
 * @param {string} IP
 * @return {string}
 */
const NEITHER = 'Neither';
const IPV6 = 'IPv6';
const IPV4 = 'IPv4';
const WHITELIST = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
]);

const numericRegex = /^\d+$/;

const isIpV4 = function (parts) {
  for (const part of parts) {
    if ((part.length > 1 && part.startsWith('0')) || !numericRegex.test(part)) {
      return false;
    }

    const partNum = parseInt(part, 10);
    if (_.isNaN(partNum) || partNum < 0 || partNum > 255) {
      return false;
    }
  }

  return true;
};

const isIpV6 = function (parts) {
  for (let part of parts) {
    if (part.length > 4 || part.length < 1) {
      return false;
    }

    part = part.toLowerCase();

    // can be 1-4 hexidecimal characters (2001 / 0db8 / db8 / 0)
    for (let i = 0; i < part.length; i++) {
      if (!WHITELIST.has(part[i])) {
        return false;
      }
    }
  }

  return true;
};

const validIPAddress = function (IP) {
  if (IP.length === 0) {
    return NEITHER;
  }

  const ipV4 = IP.split('.');
  if (ipV4.length === 4) {
    return isIpV4(ipV4) ? IPV4 : NEITHER;
  }

  const ipV6 = IP.split(':');
  if (ipV6.length === 8) {
    return isIpV6(ipV6) ? IPV6 : NEITHER;
  }

  return NEITHER;
};

console.log(validIPAddress('192.0.0.1'));

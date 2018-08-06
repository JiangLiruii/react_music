'use strict'
// document: https://nodejs.org/api/crypto.html
import crypto from 'crypto'
import bigInt from 'big-integer'
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
// 初始化向量(临时使用值)
const nonce = '0CoJUm6Qyw8W8jud';
const pubKey = '010001';
// 创建密钥函数
function createSecretKey(size) {
  const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for(let i = 0; i < size; i ++) {
    // 任意取一个key
    let pos = Math.floor(Math.random() * keys.length);
    key += keys.charAt(pos)
  }
  return key;
}
// 创建aes加密函数
function aesEncrypt(text, secKey) {
  const  _text = text;
  // 将满足aes算法的secKey转为buffer格式
  const _secKey = new Buffer(secKey, 'binary');
  // 定义initialization vector, 初始向量
  const iv = new Buffer('0102030405060708', 'binary');
  // 创建cipher对象.
  const cipher = crypto.createCipheriv('AES-128-CBC', _secKey, iv);
  // 将_text从utf8转为base64
  let encrypted = cipher.update(_text, 'utf8', 'base64');
  // 加上base64的cipher结束符
  encrypted += cipher.final('base64')
  return encrypted
}
function zfill(str, size) {
  while(str.length < size) str += '0'
  return str;
}
function rsaEncrypt(secKey, pubKey, modulus) {
  const _text = secKey.split('').reverse().join('');
  const biText = bigInt(new Buffer(_text).toString('hex'), 16),
    biEx = bigInt(pubKey, 16),
    biMod = bigInt(modulus, 16),
    biRet = biText.modPow(biEx, biMod)
  return zfill(biRet.toString(16), 256);
}
export default function Encrypt(obj) {
  const text = JSON.stringify(obj);
  const secKey = createSecretKey(16)
  const encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
  const encSecKey = rsaEncrypt(secKey, pubKey, modulus)
  return {
    params: encText,
    encSecKey: encSecKey,
  }
}

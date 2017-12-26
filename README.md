# web-zft [![Build Status](https://travis-ci.org/cloudenergy/web-zft.svg?branch=develop)](https://travis-ci.org/cloudenergy/web-zft)

## 租付通
基于集中工，分散式，整租，合租公寓进行租付管理的后台功能
 
### 租：

 1. 创建或者导入房源，完成房源相关参数配置，包括智能电表，智能门锁的属性

 1. 基于房源进入租户的预订，承租，续租，退租操作，包括承租的合同，退租的记录

 1. 基于租户承租了房源，产生相应的账单，以及账单的支付，改期，催缴等处理

### 付：

 1. 基于承租产生账单，租户使用移动端或者人工进行支付，公寓管理方进行账单处理

 1. 账单的支付或者预付费，形成的支付流水，统计报表


## 演示： 

- https://pro.modao.cc/app/11b16a4e26d5173699d915b6262704623563264c#screen=sFD65B007D91505785263419 


## Setup


### Dev

- npm run dev

### Test

- npm t

### Build

- npm run build

```
// 不同环境
npm run build -- --env=qa
npm run build -- --env=production
```

### Deploy

there are 2 environment variables needs to be set in deployment:

```bash
#For the prefix of static assets public serving path
export ZFT_PUBLIC_PATH=

#For the url of backend api server path
export ZFT_BACKEND_PROXY= 
```

### Ref

*[blade-vue README](https://doctorwork.github.io/blade-vue/#/)*



---
powered by [blade](https://github.com/doctorwork/blade-vue)
